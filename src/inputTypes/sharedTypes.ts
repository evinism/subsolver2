import { FunctionComponent } from "react";

export interface UserInputHandlerProps {
  swap?: (letterA: string, letterB: string) => unknown;
  setLock?: (letter: string, lockState: boolean) => unknown;
  lockedLetters?: Set<string>;
}

export interface InputSchema {
  lockable: boolean;
  inputHandler: FunctionComponent<UserInputHandlerProps>;
}
