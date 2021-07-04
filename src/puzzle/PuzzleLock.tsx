import { useState } from "react";
import { useKeysDown } from "./puzzle-util";

const key =
  (keysDown: Set<string>) =>
  ({ children }: { children: string }) =>
    (
      <span
        className={"key-indicator" + (keysDown.has(children) ? " pressed" : "")}
      >
        {children}
      </span>
    );

type LockState = "active" | "keyspressed" | "released";

const ANIMATION_DURATION = 1500;

const PuzzleLock = ({ unlock }: { unlock: () => void }) => {
  const [lockState, setLockState] = useState<LockState>("active");
  const keysDown = useKeysDown((newKeys) => {
    if (newKeys.has("f") && newKeys.has("j") && lockState === "active") {
      setLockState("keyspressed");
    } else if (newKeys.size === 0 && lockState === "keyspressed") {
      setLockState("released");
      setTimeout(() => unlock(), ANIMATION_DURATION);
    }
  });
  const Key = key(keysDown);
  console.log(keysDown);

  const firstKey = lockState === "released" ? "j" : "f";
  const secondKey = lockState === "released" ? "f" : "j";
  return (
    <div className={"puzzle-overlay puzzle-lock " + lockState}>
      <p>To begin, simultaneously press and release the following keys:</p>
      <div>
        <Key key={firstKey}>{firstKey}</Key> ↔{" "}
        <Key key={secondKey}>{secondKey}</Key>
      </div>
    </div>
  );
};

export default PuzzleLock;
