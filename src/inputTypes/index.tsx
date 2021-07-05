import { InputSchema } from "./sharedTypes";
import TouchscreenInputHandler from "./TouchscreenInputHandler";
import KeyboardInputHandler from "./KeyboardInputHandler";
import { isTouchscreen } from "../util";

const getInputSchema = (): InputSchema => {
  if (isTouchscreen()) {
    return {
      lockable: false,
      inputHandler: TouchscreenInputHandler,
    };
  } else {
    return {
      lockable: true,
      inputHandler: KeyboardInputHandler,
    };
  }
};

export default getInputSchema;
