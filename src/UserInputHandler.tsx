import { ReactElement, useState } from "react"
import useEventListener from '@use-it/event-listener';


interface UserInputHandlerProps {
  swap?: (letterA: string, letterB: string) => unknown;
  setLock?: (letter: string, lockState: boolean) => unknown;
}

const defaultSwap: UserInputHandlerProps['swap'] = (a, b) => console.log(`Swapped ${a} and ${b}!`);
const defaultSetLock: UserInputHandlerProps['setLock'] = (l, lockState) => console.log(`lockstate for ${l} to ${lockState}`);

type SwapState = {type: "none"} | {
  type: "swap"
  a: string,
  b: string,
} | {
  type: "invalid"
}

const UserInputHandler = (props: UserInputHandlerProps) => {
  const {
    swap = defaultSwap,
    setLock = defaultSetLock,
  } = props;
  const [keysDown, setKeysDown] = useState<Set<string>>(new Set());
  const [swapState, setSwapState] = useState<SwapState>({
    type: "none",
  });

  const handleSwapState = (next: Set<string>) => {
    const nextValues = Array.from(next.values());
    if (nextValues.length > 2) {
      setSwapState({
        type: 'invalid',
      });
      return;
    } else if(nextValues.length === 2) {
      if(swapState.type !== 'invalid') {
        setSwapState({
          type: 'swap',
          a: nextValues[0],
          b: nextValues[1],
        });
      }
    } else if (nextValues.length === 0) {
      if(swapState.type === 'swap'){
        swap(swapState.a, swapState.b);
      }
      setSwapState({type: 'none'});
    }
  }

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
    const next = new Set(keysDown);
    next.add(event.code);
    setKeysDown(next);
    handleSwapState(next);
  }

  const keyUpHandler = (event: KeyboardEvent) => {
    const next = new Set(keysDown)
    next.delete(event.code);
    setKeysDown(next);
    handleSwapState(next);
  }

  useEventListener('keydown', keyDownHandler);
  useEventListener('keyup', keyUpHandler);

  let swapStateRep: ReactElement | null = null;
  if(swapState.type === 'swap') {
    swapStateRep = <span>{swapState.a} ↔ {swapState.b}</span>
  } else if(swapState.type === 'invalid') {
    swapStateRep = <span>[ ??? ]</span>
  }

  return <div>
    <div>
      {Array.from(keysDown.values()).join(", ")}
    </div>
    <div>
      {swapStateRep}
    </div>
  </div>
}

export default UserInputHandler;