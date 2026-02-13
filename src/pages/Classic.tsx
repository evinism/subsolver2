import { useEffect, useMemo, useReducer, useState } from "react";
import Puzzle, { GameModifiers } from "../puzzle/Puzzle";
import EventStream from "../EventStream";
import plaintexts, { Plaintext } from "../plaintexts";
import { Button } from "@mui/material";
import { choose, decodeBase64 } from "../util";
import ShareIcon from '@mui/icons-material/Share';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import "./Classic.css";
import { getAllSolved, setSolved } from "../solvedStore";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import { recordEvent } from "../tracking";
import getInputSchema from "../inputTypes";
import { cameFromFacebook, shareTime } from "../fb";
import PageHeader from "../layout/PageHeader";
import { CopyTextButton } from "../CopyTextButton";

interface ClassicProps {
  headerText: string;
  gameModifiers?: GameModifiers;
}

const copyShareText = (id: string, solvedTime: string) => {
  const str = `${id ? `Subsolver #${id}` : "Custom Subsolver"} solved in ${solvedTime}!\n\nAttempt this same puzzle at ${window.location.href}`;
  recordEvent("ss_copy_share", {
    puzzleId: id || "custom"
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

  const isCustomPuzzle = !plainText.id;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    recordEvent("ss_puzzle_start", {
      puzzleId: plainText.id || "custom",
    });
    pushEvent(isCustomPuzzle ? "Started custom puzzle" : `Started puzzle #${plainText.id}`);
  }, []);

  return (
    <Puzzle
      plaintext={plainText}
      key={plainText.text}
      onComplete={() => {
        if (plainText.id) {
          setSolved(plainText.id);
        }
        forceUpdate();
      }}
      pushEvent={pushEvent}
      solvedOverlay={(solvedTime: string) => (
        <div className="success-overlay">
          <div>
            <h3>Puzzle Solved in {solvedTime}</h3>
            <p>{plainText.text}</p>
            <div className="success-author-origin">
              {!!plainText.author && <>
                  <i>—{plainText.author}</i>
                  <br />
              </>}
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
              : <CopyTextButton
                  onClick={() => copyShareText(plainText.id, solvedTime)}
                  variant="contained"
                  color="success"
                >
                  Share
                </CopyTextButton>
            }

            {!isCustomPuzzle && <Button
              onClick={startNewPuzzle}
              variant="contained"
              color="success"
              endIcon={<ArrowRightIcon/>}
            >
              Next Puzzle
            </Button>}
            {isCustomPuzzle && <Button
              href={"/"}
              variant="contained"
              color="success"
            >
              All Puzzles
            </Button>}
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
  const { hash } = useLocation();
  const plainText = useMemo(() => {
    if (puzzleId === "custom") {
      try {
        return JSON.parse(decodeBase64(decodeURIComponent(hash.substring(1)))) as Plaintext;
      } catch (e) {
        console.error("Failed to parse custom puzzle from URL:", e);
        window.alert("Failed to parse custom puzzle");
        return undefined;
      }
    }

    return plaintexts.find((plain) => plain.id === puzzleId);
  }, [puzzleId, hash]);
  if (!plainText) {
    return <Redirect to={basePath} />;
  }
  return (
    <article className="main-content">
      <header className="puzzle-header">
        <span>{plainText.id ? `Puzzle #${plainText.id}` : "Custom puzzle"}</span>
        <span>
          {getAllSolved().length} / {plaintexts.length} Solved
        </span>
      </header>
      <ClassicPuzzle
        gameModifiers={gameModifiers}
        startNewPuzzle={startNewPuzzle}
        plainText={plainText}
        pushEvent={pushEvent}
        key={puzzleId}
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
      <PageHeader headerText={headerText} />
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
