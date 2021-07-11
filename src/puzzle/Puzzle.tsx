import "./Puzzle.css";
import CipherTextDisplay from "./CipherTextDisplay";
import { ReactElement, useMemo, useState } from "react";
import { swapLetters, findInitialMapping } from "./mapping";
import { alphabet } from "../constants";
import { hrTime, shuffleArray } from "../util";
import { Plaintext } from "../plaintexts";
import { applyMapping } from "./mapping";
import { Card } from "@material-ui/core";
import KeyboardPuzzleLock from "./KeyboardPuzzleLock";
import { getAllSolved } from "../solvedStore";
import { recordEvent } from "../tracking";
import getInputSchema from "../inputTypes";

export interface GameModifiers {
  hideSpaces?: boolean;
  showPunctuation?: boolean;
  keepCapitals?: boolean;
}

type PuzzleState = "locked" | "active" | "complete";

const startLocked = () => {
  const { lockable } = getInputSchema();
  return lockable && getAllSolved().length === 0;
};

interface PuzzleProps extends GameModifiers {
  plaintext: Plaintext;
  onComplete: () => void;
  solvedOverlay: (solvedTime: string) => ReactElement;
  pushEvent: (evtStr: string) => unknown;
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
  const { inputHandler: InputHandler } = getInputSchema();

  const shouldStartLocked = startLocked();
  const initialMapping = useMemo(() => findInitialMapping(text), [text]);
  const [mapping, setMapping] = useState<string>(initialMapping);
  const [lockedLetters, setLockedLetters] = useState<Set<string>>(new Set());
  const [puzzleState, setPuzzleState] = useState<PuzzleState>(
    startLocked() ? "locked" : "active"
  );

  // Puzzle start and end times
  const [puzzleStartTime, setPuzzleStartTime] = useState<Date | void>(
    shouldStartLocked ? undefined : new Date()
  );
  const [puzzleEndTime, setPuzzleEndTime] = useState<Date | void>();

  const handleSwap = (a: string, b: string) => {
    const pushFailedSwap = (x: string) =>
      pushEvent(`${x} is locked; Swap prevented.`);
    if (lockedLetters.has(a)) {
      pushFailedSwap(a);
    } else if (lockedLetters.has(b)) {
      pushFailedSwap(b);
    } else {
      recordEvent("ss_swap", { a, b, puzzleId: id });
      const newMapping = swapLetters(mapping, a, b);
      setMapping(newMapping);
      pushEvent(`"${a.toUpperCase()}" and "${b.toUpperCase()}" swapped.`);
      if (applyMapping(text, newMapping) === applyMapping(text, alphabet)) {
        pushEvent(`Puzzle #${id} solved`);
        const allSolved = getAllSolved();
        const puzzleEndTime = new Date();
        recordEvent("ss_solve", {
          puzzleId: id,
          startTime: puzzleStartTime!.toJSON(),
          endTime: puzzleEndTime.toJSON(),
          solvedTime: getSolvedTime(),
          solved: JSON.stringify(allSolved),
          solvedCount: allSolved.length.toString(),
        });
        setPuzzleEndTime(puzzleEndTime);
        setPuzzleState("complete");
        onComplete();
      }
    }
  };

  const getSolvedTime = () => {
    if (!puzzleStartTime || !puzzleEndTime) {
      return "";
    }
    return hrTime(puzzleEndTime.getTime() - puzzleStartTime.getTime());
  };

  function suppressIfInactive(fn: any) {
    return (...args: any) => puzzleState === "active" && fn(...args);
  }

  const handleLocked = (letter: string, locked: boolean) => {
    recordEvent("ss_toggle_letter_locked", {
      letter,
      locked: locked.toString(),
      puzzleId: id,
    });
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
    setLockedLetters(new Set());
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
    <div className={"puzzle " + puzzleState}>
      <Card className="puzzle-overlayable">
        <div className={puzzleState === "complete" ? "blurred" : ""}>
          <CipherTextDisplay
            text={applyMapping(text, mapping, {
              hideSpaces,
              showPunctuation,
              keepCapitals,
            })}
            lockedLetters={lockedLetters}
          />
        </div>
        <div className="puzzle-buttons-wrapper">
          <div className="puzzle-buttons">
            <button onClick={suppressIfInactive(restartLevel)}>Restart</button>
            <button onClick={suppressIfInactive(unlockAllLetters)}>
              Remove lock on all letters
            </button>
            <button onClick={suppressIfInactive(randomizeMapping)}>
              Randomize
            </button>
          </div>
        </div>
        {puzzleState === "complete" && (
          <div className="puzzle-overlay puzzle-solved-overlay">
            {solvedOverlay(getSolvedTime())}
          </div>
        )}
        {puzzleState === "locked" && (
          <KeyboardPuzzleLock
            unlock={() => {
              setPuzzleState("active");
              setPuzzleStartTime(new Date());
            }}
          />
        )}
      </Card>
      <InputHandler
        swap={suppressIfInactive(handleSwap)}
        setLock={suppressIfInactive(handleLocked)}
        lockedLetters={lockedLetters}
      />
    </div>
  );
}

export default Puzzle;
