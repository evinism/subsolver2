import "./TouchscreenInputHandler.css";
import { Portal } from "@material-ui/core";
import useEventListener from "@use-it/event-listener";
import { ReactNode, TouchEvent, useState } from "react";

const keyboardLayout = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  "zxcvbnm".split(""),
];

type SwapState = {
  a: string;
  b?: string;
};

const TouchscreenInputHandler = () => {
  const maybeGetData = (event: any) => {
    const { pageX, pageY } = event.touches[0];
    const eventTarget = document.elementFromPoint(
      pageX,
      pageY
    ) as HTMLElement | void;
    return eventTarget?.attributes?.getNamedItem("data-faux-keyboard-key")
      ?.value;
  };

  const [swapState, setSwapState] = useState<SwapState | void>();
  useEventListener("touchstart", (event: any) => {
    const value = maybeGetData(event);
    if (value) {
      setSwapState({
        a: value,
      });
    }
  });

  useEventListener("touchmove", (event: any) => {
    if (!swapState) {
      return;
    }
    const value = maybeGetData(event);
    if (value !== swapState.a && value !== swapState.b) {
      setSwapState({
        a: swapState.a,
        b: value,
      });
    }
  });

  useEventListener("touchend", () => {
    setSwapState();
  });

  let swapRep: string | undefined = undefined;
  if (swapState) {
    swapRep = JSON.stringify(swapState);
  }

  const pressed: Set<string> = new Set();
  if (swapState) {
    pressed.add(swapState.a);
    if (swapState.b) {
      pressed.add(swapState.b);
    }
  }

  let swapStateRep: ReactNode | undefined = undefined;

  if (swapState) {
    if (swapState.a === "space") {
      swapStateRep = <span>Toggling lock of {swapState.b || "_"}</span>;
    } else if (swapState.b === "space") {
      swapStateRep = <span>Toggling lock of {swapState.a || "_"}</span>;
    } else {
      swapStateRep = (
        <span>
          {swapState.a} ↔ {swapState.b || "_"}
        </span>
      );
    }
  }

  return (
    <Portal container={document.body}>
      <div className="touchscreen-input-handler-wrapper">
        <div className="touchscreen-input-handler">
          {swapRep && (
            <div className="swap-rep-wrapper">
              <span className="swap-rep">{swapStateRep}</span>
            </div>
          )}
          <div className="faux-keyboard">
            {keyboardLayout.map((row) => (
              <div className="row">
                {row.map((key) => (
                  <span
                    className={"key " + (pressed.has(key) && "pressed")}
                    data-faux-keyboard-key={key}
                  >
                    {key}
                  </span>
                ))}
              </div>
            ))}
            <div className="row">
              <span
                className={"key key-big " + (pressed.has("space") && "pressed")}
                data-faux-keyboard-key="space"
              >
                Lock/Unlock
              </span>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default TouchscreenInputHandler;
