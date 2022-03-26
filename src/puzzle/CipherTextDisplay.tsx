import { Card } from "@mui/material";
import { useKeysDown } from "./puzzle-util";

interface CipherTextDisplayProps {
  text: string;
  lockedLetters?: Set<string>;
}

const CipherTextDisplay = ({
  text,
  lockedLetters = new Set(),
}: CipherTextDisplayProps) => {
  const keysDown = useKeysDown();

  const children = text.split("").map((letter, index) => {
    const lowerCased = letter.toLowerCase();
    return (
        <span
          className={
            "puzzle-letter " +
            (lockedLetters.has(lowerCased) ? "locked" : "unlocked") +
            (keysDown.has(lowerCased) ? " pressed" : "")
          }
          key={letter + index}
        >
          {letter}
        </span>
    );
  });

  return <Card>
    <div className="cipher-text-display">{children}</div>
  </Card>;
};

export default CipherTextDisplay;
