import { InputSchema } from "./sharedTypes";
import TouchscreenInputHandler from "./TouchscreenInputHandler";
import KeyboardInputHandler from "./KeyboardInputHandler";
import { isTouchscreen } from "../util";

const getInputSchema = (): InputSchema => {
  if (isTouchscreen()) {
    return {
      lockable: false,
      inputHandler: TouchscreenInputHandler,
      bottomHelpText: (
        <>
          Drag between two letters to swap them!
          <br />
          Drag between a letter and the lock button to toggle whether it's
          locked!
        </>
      ),
    };
  } else {
    return {
      lockable: true,
      inputHandler: KeyboardInputHandler,
      bottomHelpText: (
        <>
          Press two letters simultaneously to swap them!
          <br />
          Press one letter with space to toggle whether it's locked!
        </>
      ),
    };
  }
};

export default getInputSchema;
