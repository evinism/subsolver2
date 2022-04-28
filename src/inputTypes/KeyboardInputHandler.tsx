import { ReactElement, useState } from "react";
import { useKeysDown } from "../puzzle/puzzle-util";
import { UserInputHandlerProps } from "./sharedTypes";

const defaultSwap: UserInputHandlerProps["swap"] = (a, b) =>
  console.log(`Swapped ${a} and ${b}!`);
const defaultSetLock: UserInputHandlerProps["setLock"] = (l, lockState) =>
  console.log(`lockstate for ${l} to ${lockState}`);

type SwapState =
  | { type: "none" }
  | {
      type: "swap";
      a: string;
      b: string;
    }
  | {
      type: "invalid";
    };

const UserInputHandler = (props: UserInputHandlerProps) => {
  const {
    swap = defaultSwap,
    setLock = defaultSetLock,
    lockedLetters = new Set(),
  } = props;
  const [swapState, setSwapState] = useState<SwapState>({
    type: "none",
  });

  const handleSwapState = (next: Set<string>) => {
    const nextValues = Array.from(next.values()).sort();
    if (nextValues.length > 2) {
      setSwapState({
        type: "invalid",
      });
      return;
    } else if (nextValues.length === 2) {
      if (swapState.type !== "invalid") {
        setSwapState({
          type: "swap",
          a: nextValues[0],
          b: nextValues[1],
        });
      }
    } else if (nextValues.length === 0) {
      if (swapState.type === "swap") {
        if (swapState.a === " ") {
          setLock(swapState.b, !lockedLetters.has(swapState.b));
        } else if (swapState.b === " ") {
          setLock(swapState.a, !lockedLetters.has(swapState.a));
        } else {
          swap(swapState.a, swapState.b);
        }
      }
      setSwapState({ type: "none" });
    }
  };

  const keysDown = useKeysDown(handleSwapState);

  let swapStateRep: ReactElement | null = null;
  if (swapState.type === "swap") {
    if (swapState.a === " ") {
      swapStateRep = <span>Toggling lock of {swapState.b}</span>;
    } else if (swapState.b === " ") {
      swapStateRep = <span>Toggling lock of {swapState.a}</span>;
    } else {
      swapStateRep = (
        <span>
          {swapState.a} ↔ {swapState.b}
        </span>
      );
    }
  } else if (swapState.type === "invalid") {
    swapStateRep = <span>[ ??? ]</span>;
  }

  const keysDownRep = Array.from(keysDown.values()).sort().join(", ") || "None";
  return (
    <div className="user-input-info-bar">
      <div>Keys Down: {keysDownRep}</div>
      <div>{swapStateRep}</div>
    </div>
  );
};

export default UserInputHandler;
