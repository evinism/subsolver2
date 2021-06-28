interface CipherTextDisplayProps {
  text: string;
  lockedLetters: Set<string>;
}

const CipherTextDisplay = ({ text, lockedLetters }: CipherTextDisplayProps) => {
  const children = text.split("").map((letter, index) => (
    <span
      className={
        "puzzle-letter " + (lockedLetters.has(letter) ? "locked" : "unlocked")
      }
      key={letter + index}
    >
      {letter}
    </span>
  ));

  return <div className="cipher-text-display">{children}</div>;
};

export default CipherTextDisplay;
