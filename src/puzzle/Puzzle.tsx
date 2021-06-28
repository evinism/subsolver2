import UserInputHandler from "./UserInputHandler";
import CipherTextDisplay from "./CipherTextDisplay";
import { useMemo, useState } from "react";
import { swapLetters, findInitialMapping } from "./mapping";
import EventStream from "./EventStream";
import { alphabet } from "../constants";
import { shuffleArray } from "../util";
import { Plaintext } from "../plaintexts";
import { applyMapping } from "./mapping";

interface PuzzleProps {
  plaintext: Plaintext;
  onComplete: () => void;
}

function Puzzle({ plaintext: { text, id } }: PuzzleProps) {
  const initialMapping = useMemo(() => findInitialMapping(text), [text]);
  const [mapping, setMapping] = useState<string>(initialMapping);
  const [lockedLetters, setLockedLetters] = useState<Set<string>>(new Set());
  const [events, setEvents] = useState<string[]>([]);
  const [showSpaces, setShowSpaces] = useState<boolean>(false);

  const handleSwap = (a: string, b: string) => {
    const pushFailedSwap = (x: string) =>
      pushEvent(`${x} is locked; Swap prevented.`);
    if (lockedLetters.has(a)) {
      pushFailedSwap(a);
    } else if (lockedLetters.has(b)) {
      pushFailedSwap(b);
    } else {
      setMapping(swapLetters(mapping, a, b));
      pushEvent(`Swapped letters ${a} and ${b}.`);
    }
  };

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
      <CipherTextDisplay
        text={applyMapping(text, mapping, showSpaces)}
        lockedLetters={lockedLetters}
      />
      <div className="puzzle-buttons">
        <button onClick={restartLevel}>Restart</button>
        <button onClick={unlockAllLetters}>Remove lock on all letters</button>
        <button onClick={randomizeMapping}>Randomize</button>
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
        swap={handleSwap}
        setLock={handleLocked}
        lockedLetters={lockedLetters}
      />
      <EventStream events={events} />
    </div>
  );
}

export default Puzzle;
