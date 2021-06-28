import UserInputHandler from "./UserInputHandler";
import CipherTextDisplay from "./CipherTextDisplay";
import { useMemo, useState } from "react";
import { swapLetters, findInitialMapping } from "./mapping";

interface PuzzleProps {
  text: string;
  onComplete: () => void;
}

function Puzzle({ text }: PuzzleProps) {
  const initialMapping = useMemo(() => findInitialMapping(text), [text]);
  const [mapping, setMapping] = useState<string>(initialMapping);
  const [lockedLetters, setLockedLetters] = useState<Set<string>>(new Set());
  const handleSwap = (a: string, b: string) => {
    setMapping(swapLetters(mapping, a, b));
  };

  const handleLocked = (letter: string, locked: boolean) => {
    const newSet = new Set(lockedLetters);
    if (locked) {
      newSet.add(letter);
    } else {
      newSet.delete(letter);
    }
    setLockedLetters(newSet);
  };
  const restartLevel = () => setMapping(initialMapping);
  const unlockAllLetters = () => setLockedLetters(new Set());

  return (
    <div className="puzzle">
      <CipherTextDisplay
        text={text}
        mapping={mapping}
        lockedLetters={lockedLetters}
        revealed={false}
      />
      <div>
        <button onClick={restartLevel}>Restart Level</button>
        <button onClick={unlockAllLetters}>Unlock All Letters</button>
      </div>
      <UserInputHandler
        swap={handleSwap}
        setLock={handleLocked}
        lockedLetters={lockedLetters}
      />
    </div>
  );
}

export default Puzzle;
