import { useState } from "react";
import keysPressed from "../keyspressed";
import useEventListener from "@use-it/event-listener";

const getLettersPressed = () =>
  new Set(
    Array.from(keysPressed.getKeysPressed())
  );

export const useKeysDown = (
  handleKeysChange: (keys: Set<string>) => unknown = () => {}
) => {
  const [keysDown, setKeysDown] = useState<Set<string>>(new Set());

  const keyDownHandler = () => {
    const next = getLettersPressed();
    setKeysDown(next);
    handleKeysChange(next);
  };

  const keyUpHandler = () => {
    const next = getLettersPressed();
    setKeysDown(next);
    handleKeysChange(next);
  };

  useEventListener("keydown", keyDownHandler);
  useEventListener("keyup", keyUpHandler);

  return keysDown;
};
