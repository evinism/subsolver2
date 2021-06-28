import {applyMapping} from './mapping';

interface CipherTextDisplayProps {
  text: string,
  mapping: string,
  lockedLetters: Set<string>,
  revealed: boolean,
}

const CipherTextDisplay = ({text, mapping, lockedLetters}: CipherTextDisplayProps) => {
  const children = applyMapping(text, mapping).split('').map((letter) => 
    <span className={lockedLetters.has(letter) ? 'locked' : 'unlocked'}>{letter}</span>
  )

  return (<div className="cipher-text-display">
    {children}
  </div>);
}

export default CipherTextDisplay