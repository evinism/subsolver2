import { useEffect, useReducer, useState } from "react";
import Puzzle, { GameModifiers } from "../puzzle/Puzzle";
import EventStream from "../EventStream";
import plaintexts, { Plaintext } from "../plaintexts";
import { Button } from "@mui/material";
import { choose } from "../util";
import ShareIcon from '@mui/icons-material/Share';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import "./Classic.css";
import { getAllSolved, setSolved } from "../solvedStore";
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom";
import { recordEvent } from "../tracking";
import getInputSchema from "../inputTypes";
import { cameFromFacebook, shareTime } from "../fb";

interface ClassicProps {
  headerText: string;
  gameModifiers?: GameModifiers;
}

const copyShareText = (id: string, solvedTime: string) => {
  const str = `Subsolver #${id} solved in ${solvedTime}!\n\nAttempt this same puzzle at ${window.location.href}`;
  recordEvent("ss_copy_share", {
    puzzleId: id
  });
  navigator.clipboard.writeText(str);
}

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
            {
              cameFromFacebook()
              ? <Button
                  onClick={() => shareTime(plainText.id, solvedTime)}
                  variant="contained"
                  color="success"
                  endIcon={<ShareIcon />}
                >
                  Share
                </Button>
              : <Button
                  onClick={() => copyShareText(plainText.id, solvedTime)}
                  variant="contained"
                  color="success"
                  endIcon={<ContentCopyIcon />}
                >
                  Share
                </Button>
            }

            <Button
              onClick={startNewPuzzle}
              variant="contained"
              color="success"
              endIcon={<ArrowRightIcon />}
            >
              Next Puzzle
            </Button>
          </div>
        </div>
      )}
      {...gameModifiers}
    />
  );
};

interface ClassicPageContentsProps {
  gameModifiers?: GameModifiers;
  pushEvent: (k: string) => unknown;
  startNewPuzzle: () => void;
  events: string[];
  basePath: string;
}

const ClassicPageContents = ({
  gameModifiers,
  startNewPuzzle,
  pushEvent,
  events,
  basePath,
}: ClassicPageContentsProps) => {
  let { puzzleId } = useParams() as { puzzleId: string };
  const plainText = plaintexts.find((plain) => plain.id === puzzleId);
  if (!plainText) {
    return <Redirect to={basePath} />;
  }
  return (
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
      <input type="text" id="puzzle-self-link" value={window.location.href} />
      <EventStream events={events} />
    </article>
  );
};

const ClassicRouter = ({ gameModifiers, headerText }: ClassicProps) => {
  let { path } = useRouteMatch();
  const [events, setEvents] = useState<string[]>([]);

  const pushEvent = (ev: string) => {
    const MAX_EVENTS = 64;
    const newEvents = events.slice(0, MAX_EVENTS);
    newEvents.unshift(ev);
    setEvents(newEvents);
  };

  const history = useHistory();
  const startNewPuzzle = () => history.replace(path);

  return (
    <div className="classic-page">
      <header>
        <Link to="/" className="back-button">
          ⟨ Back
        </Link>
        <h2>Subsolver: {headerText}</h2>
      </header>
      <Switch>
        <Route path={`${path}/:puzzleId`}>
          <ClassicPageContents
            gameModifiers={gameModifiers}
            startNewPuzzle={startNewPuzzle}
            basePath={path}
            pushEvent={pushEvent}
            events={events}
          />
        </Route>
        <Route>
          <Redirect to={`${path}/${chooseNextPlaintext().id}`} />
        </Route>
      </Switch>
    </div>
  );
};

export default ClassicRouter;
