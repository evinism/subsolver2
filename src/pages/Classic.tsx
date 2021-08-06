import { useEffect, useReducer, useState } from "react";
import Puzzle, { GameModifiers } from "../puzzle/Puzzle";
import EventStream from "../EventStream";
import plaintexts, { Plaintext } from "../plaintexts";
import { choose } from "../util";
import "./Classic.css";
import { getAllSolved, setSolved } from "../solvedStore";
import { Link, Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { recordEvent } from "../tracking";
import getInputSchema from "../inputTypes";
import { shareTime, cameFromFacebook } from "../fb";

interface ClassicProps {
  headerText: string;
  gameModifiers?: GameModifiers;
}

const copySelfLink = () => {
  const copyText = document.getElementById("puzzle-self-link") as any;
  if (!copyText) {
    return;
  }
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  document.execCommand("copy");
  const selection = window.getSelection();
  selection && selection.removeAllRanges();
};

const chooseNextPlaintext = () => {
  let solved = getAllSolved();
  if (plaintexts.length === solved.length) {
    return choose(plaintexts);
  }
  const unsolved = plaintexts.filter(
    (plaintext) => !solved.includes(plaintext.id)
  );
  return choose(unsolved);
};

interface ClassicPuzzleProps {
  gameModifiers?: GameModifiers;
  plainText: Plaintext;
  pushEvent: (k: string) => unknown;
  startNewPuzzle: () => void;
}

const ClassicPuzzle = ({
  gameModifiers,
  plainText,
  pushEvent,
  startNewPuzzle,
}: ClassicPuzzleProps) => {
  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    recordEvent("ss_puzzle_start", {
      puzzleId: plainText.id,
    });
    pushEvent(`Started puzzle #${plainText.id}`);
  }, []);

  return (
    <Puzzle
      plaintext={plainText}
      key={plainText.text}
      onComplete={() => {
        setSolved(plainText.id);
        forceUpdate();
      }}
      pushEvent={pushEvent}
      solvedOverlay={(solvedTime: string) => (
        <div className="success-overlay">
          <div>
            <h3>Puzzle Solved in {solvedTime}</h3>
            <p>{plainText.text}</p>
            <div className="success-author-origin">
              <i>—{plainText.author}</i>
              <br />
              {plainText.origin}
            </div>
          </div>
          <div className="success-button-group">
            {cameFromFacebook() ? (
              <button onClick={() => shareTime(plainText.id, solvedTime)}>
                Challenge your friends!
              </button>
            ) : (
              <button onClick={copySelfLink}>Copy Puzzle Link</button>
            )}
            <button onClick={startNewPuzzle}>Next Puzzle</button>
          </div>
        </div>
      )}
      {...gameModifiers}
    />
  );
};

const Classic = ({ gameModifiers, headerText }: ClassicProps) => {
  let { path } = useRouteMatch();

  const [plainText, setPlainText] = useState(chooseNextPlaintext());
  const [events, setEvents] = useState<string[]>([]);

  const pushEvent = (ev: string) => {
    const MAX_EVENTS = 64;
    const newEvents = events.slice(0, MAX_EVENTS);
    newEvents.unshift(ev);
    setEvents(newEvents);
  };

  const startNewPuzzle = () => {
    setPlainText(chooseNextPlaintext());
  };

  const puzzleSelfLink = window.location.href;

  return (
    <div className="classic-page">
      <header>
        <Link to="/" className="back-button">
          ⟨ Back
        </Link>
        <h2>Subsolver: {headerText}</h2>
      </header>
      <Switch>
        <Route path={`${path}/${plainText.id}`}>
          <article className="main-content">
            <header className="puzzle-header">
              <span>Puzzle #{plainText.id}</span>
              <span>
                {getAllSolved().length} / {plaintexts.length} Solved
              </span>
            </header>
            <ClassicPuzzle
              gameModifiers={gameModifiers}
              startNewPuzzle={startNewPuzzle}
              plainText={plainText}
              pushEvent={pushEvent}
              key={plainText.id}
            />
            <p>{getInputSchema().bottomHelpText}</p>
            <input type="text" id="puzzle-self-link" value={puzzleSelfLink} />
            <EventStream events={events} />
          </article>
        </Route>
        <Route>
          <Redirect to={`${path}/${plainText.id}`} />
        </Route>
      </Switch>
    </div>
  );
};

export default Classic;
