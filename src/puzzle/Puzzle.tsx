import UserInputHandler from "./UserInputHandler";
import CipherTextDisplay from "./CipherTextDisplay";
import { ReactElement, useMemo, useState } from "react";
import { swapLetters, findInitialMapping } from "./mapping";
import EventStream from "./EventStream";
import { alphabet } from "../constants";
import { shuffleArray } from "../util";
import { Plaintext } from "../plaintexts";
import { applyMapping } from "./mapping";

interface PuzzleProps {
  plaintext: Plaintext;
  onComplete: () => void;
  solvedOverlay: ReactElement;
}

function Puzzle({
  plaintext: { text, id },
  onComplete,
  solvedOverlay,
}: PuzzleProps) {
  const initialMapping = useMemo(() => findInitialMapping(text), [text]);
  const [mapping, setMapping] = useState<string>(initialMapping);
  const [lockedLetters, setLockedLetters] = useState<Set<string>>(new Set());
  const [events, setEvents] = useState<string[]>([]);
  const [showSpaces, setShowSpaces] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);

  const handleSwap = (a: string, b: string) => {
    const pushFailedSwap = (x: string) =>
      pushEvent(`${x} is locked; Swap prevented.`);
    if (lockedLetters.has(a)) {
      pushFailedSwap(a);
    } else if (lockedLetters.has(b)) {
      pushFailedSwap(b);
    } else {
      const newMapping = swapLetters(mapping, a, b);
      setMapping(newMapping);
      pushEvent(`Swapped letters ${a} and ${b}.`);
      if (applyMapping(text, newMapping) === applyMapping(text, alphabet)) {
        pushEvent(`Puzzle #${id} solved`);
        setComplete(true);
        onComplete();
      }
    }
  };

  function suppressIfComplete(fn: any) {
    return (...args: any) => !complete && fn(...args);
  }

  const pushEvent = (ev: string) => {
    const MAX_EVENTS = 64;
    const newEvents = events.slice(0, MAX_EVENTS);
    newEvents.unshift(ev);
    setEvents(newEvents);
  };

  const handleLocked = (letter: string, locked: boolean) => {
    const newSet = new Set(lockedLetters);
    if (locked) {
      newSet.add(letter);
    } else {
      newSet.delete(letter);
    }
    setLockedLetters(newSet);
    pushEvent(`${locked ? "Locked" : "Unlocked"} letter ${letter}.`);
  };
  const restartLevel = () => {
    setMapping(initialMapping);
    pushEvent("Puzzle restarted");
  };
  const unlockAllLetters = () => {
    setLockedLetters(new Set());
    pushEvent("Unlocked all letters");
  };
  const randomizeMapping = () => {
    setMapping(shuffleArray(alphabet.split("")).join(""));
    setLockedLetters(new Set());
    pushEvent("Puzzle randomized");
  };

  return (
    <div className="puzzle">
      <header>Puzzle #{id}</header>
      <div className="puzzle-overlayable">
        <div className={complete ? " blurred" : ""}>
          <CipherTextDisplay
            text={applyMapping(text, mapping, showSpaces)}
            lockedLetters={lockedLetters}
          />
          <div className="puzzle-buttons">
            <button onClick={suppressIfComplete(restartLevel)}>Restart</button>
            <button onClick={suppressIfComplete(unlockAllLetters)}>
              Remove lock on all letters
            </button>
            <button onClick={suppressIfComplete(randomizeMapping)}>
              Randomize
            </button>
            <label>
              Easy Mode
              <input
                type="checkbox"
                checked={showSpaces}
                onClick={() => setShowSpaces(!showSpaces)}
              />
            </label>
          </div>
          <UserInputHandler
            swap={suppressIfComplete(handleSwap)}
            setLock={suppressIfComplete(handleLocked)}
            lockedLetters={lockedLetters}
          />
        </div>
        {complete && (
          <div className="puzzle-solved-overlay">{solvedOverlay}</div>
        )}
      </div>
      <EventStream events={events} />
    </div>
  );
}

export default Puzzle;
