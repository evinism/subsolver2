import { ReactElement, useState } from "react"
import useEventListener from '@use-it/event-listener';
import keysPressed from './keyspressed';

const getLettersPressed = () => new Set(
  Array.from(keysPressed.getKeysPressed())
    .filter((str) => str.startsWith('Key') || str === 'Space')
    .map((str) => str.toLowerCase().replace('key', ''))
)

interface UserInputHandlerProps {
  swap?: (letterA: string, letterB: string) => unknown;
  setLock?: (letter: string, lockState: boolean) => unknown;
  lockedLetters?: Set<string>,
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
    lockedLetters = new Set(),
  } = props;
  const [keysDown, setKeysDown] = useState<Set<string>>(new Set());
  const [swapState, setSwapState] = useState<SwapState>({
    type: "none",
  });

  const handleSwapState = (next: Set<string>) => {
    const nextValues = Array.from(next.values()).sort();
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
        if (swapState.a === 'space') {
          setLock(swapState.b, !lockedLetters.has(swapState.b));
        } else if(swapState.b === 'space') {
          setLock(swapState.a, !lockedLetters.has(swapState.a));
        } else {
          swap(swapState.a, swapState.b);
        }
      }
      setSwapState({type: 'none'});
    }
  }

  const keyDownHandler = () => {
    const next = getLettersPressed();
    setKeysDown(next);
    handleSwapState(next);
  }

  const keyUpHandler = () => {
    const next = getLettersPressed();
    setKeysDown(next);
    handleSwapState(next);
  }

  useEventListener('keydown', keyDownHandler);
  useEventListener('keyup', keyUpHandler);

  let swapStateRep: ReactElement | null = null;
  if(swapState.type === 'swap') {
    if (swapState.a === 'space') {
      swapStateRep = <span>Toggling lock of {swapState.b}</span>
    } else if(swapState.b === 'space') {
      swapStateRep = <span>Toggling lock of {swapState.a}</span>
    } else {
      swapStateRep = <span>{swapState.a} ↔ {swapState.b}</span>
    }
  } else if(swapState.type === 'invalid') {
    swapStateRep = <span>[ ??? ]</span>
  }

  const keysDownRep = Array.from(keysDown.values()).sort().map(key => key.replace('space', "🔒")).join(", ");
  return <div>
    <div>
      {keysDownRep}
    </div>
    <div>
      {swapStateRep}
    </div>
  </div>
}

export default UserInputHandler;