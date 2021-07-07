import { useEffect, useReducer, useState } from "react";
import Puzzle, { GameModifiers } from "../puzzle/Puzzle";
import EventStream from "../EventStream";
import plaintexts from "../plaintexts";
import { choose } from "../util";
import "./Classic.css";
import { getAllSolved, setSolved } from "../solvedStore";
import { Link } from "react-router-dom";
import { recordEvent } from "../tracking";

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
  const location = window.location;
  if (/^#puzzle:[0-9]+$/.test(location.hash)) {
    const hashPuzzleId = location.hash.split(":")[1];
    const plaintext = plaintexts.find(
      (plaintext) => plaintext.id === hashPuzzleId
    );

    if (plaintext) {
      return plaintext;
    }
  }
  let solved = getAllSolved();
  if (plaintexts.length === solved.length) {
    return choose(plaintexts);
  }
  const unsolved = plaintexts.filter(
    (plaintext) => !solved.includes(plaintext.id)
  );
  return choose(unsolved);
};

const Classic = ({ gameModifiers, headerText }: ClassicProps) => {
  const [plainText, setPlainText] = useState(chooseNextPlaintext());
  const [events, setEvents] = useState<string[]>([
    `Started puzzle #${plainText.id}`,
  ]);
  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  useEffect(() => {
    recordEvent("ss_puzzle_start", {
      puzzleId: plainText.id,
    });
  }, [plainText.id]);

  const pushEvent = (ev: string) => {
    const MAX_EVENTS = 64;
    const newEvents = events.slice(0, MAX_EVENTS);
    newEvents.unshift(ev);
    setEvents(newEvents);
  };

  const startNewPuzzle = () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.href.substr(
        0,
        window.location.href.length - window.location.hash.length
      )
    );
    setPlainText(chooseNextPlaintext());
    pushEvent(`Started puzzle #${plainText.id}`);
  };

  const puzzleSelfLink =
    window.location.href.replace(/#.*/, "") + `#puzzle:${plainText.id}`;

  return (
    <div className="classic-page">
      <header>
        <Link to="/" className="back-button">
          ⟨ Back
        </Link>
        <h2>Subsolver: {headerText}</h2>
      </header>
      <article className="main-content">
        <header className="puzzle-header">
          <span>Puzzle #{plainText.id}</span>
          <span>
            {getAllSolved().length} / {plaintexts.length} Solved
          </span>
        </header>
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
                <button onClick={copySelfLink}>Copy Puzzle Link</button>
                <button onClick={startNewPuzzle}>Next Puzzle</button>
              </div>
            </div>
          )}
          {...gameModifiers}
        />
        <p>
          Press two letters simultaneously to swap them!
          <br />
          Press one letter with space to toggle whether it's locked!
        </p>
        <input type="text" id="puzzle-self-link" value={puzzleSelfLink} />
        <EventStream events={events} />
      </article>
    </div>
  );
};

export default Classic;
