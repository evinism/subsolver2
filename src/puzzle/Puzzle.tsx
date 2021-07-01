import "./Puzzle.css";
import UserInputHandler from "./UserInputHandler";
import CipherTextDisplay from "./CipherTextDisplay";
import { ReactElement, useMemo, useState } from "react";
import { swapLetters, findInitialMapping } from "./mapping";
import { alphabet } from "../constants";
import { shuffleArray } from "../util";
import { Plaintext } from "../plaintexts";
import { applyMapping } from "./mapping";
import { Card } from "@material-ui/core";

interface PuzzleProps {
  plaintext: Plaintext;
  onComplete: () => void;
  solvedOverlay: ReactElement;
  pushEvent: (evtStr: string) => unknown;
  hideSpaces?: boolean;
  showPunctuation?: boolean;
  keepCapitals?: boolean;
}

function Puzzle({
  plaintext: { text, id },
  onComplete,
  solvedOverlay,
  pushEvent,
  hideSpaces,
  showPunctuation,
  keepCapitals,
}: PuzzleProps) {
  const initialMapping = useMemo(() => findInitialMapping(text), [text]);
  const [mapping, setMapping] = useState<string>(initialMapping);
  const [lockedLetters, setLockedLetters] = useState<Set<string>>(new Set());
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
      pushEvent(`"${a.toUpperCase()}" and "${b.toUpperCase()}" swapped.`);
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

  const handleLocked = (letter: string, locked: boolean) => {
    const newSet = new Set(lockedLetters);
    if (locked) {
      newSet.add(letter);
    } else {
      newSet.delete(letter);
    }
    setLockedLetters(newSet);
    pushEvent(`"${letter.toUpperCase()}" ${locked ? "Locked" : "Unlocked"}.`);
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
      <Card className="puzzle-overlayable">
        <div className={complete ? " blurred" : ""}>
          <CipherTextDisplay
            text={applyMapping(text, mapping, {
              hideSpaces,
              showPunctuation,
              keepCapitals,
            })}
            lockedLetters={lockedLetters}
          />
        </div>
        <div className="puzzle-buttons-hit-area">
          <div className="puzzle-buttons-wrapper">
            <div className="puzzle-buttons">
              <button onClick={suppressIfComplete(restartLevel)}>
                Restart
              </button>
              <button onClick={suppressIfComplete(unlockAllLetters)}>
                Remove lock on all letters
              </button>
              <button onClick={suppressIfComplete(randomizeMapping)}>
                Randomize
              </button>
            </div>
          </div>
        </div>
        {complete && (
          <div className="puzzle-solved-overlay">{solvedOverlay}</div>
        )}
      </Card>
      <UserInputHandler
        swap={suppressIfComplete(handleSwap)}
        setLock={suppressIfComplete(handleLocked)}
        lockedLetters={lockedLetters}
      />
    </div>
  );
}

export default Puzzle;
