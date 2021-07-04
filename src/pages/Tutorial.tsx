import "./Tutorial.css";
import CipherTextDisplay from "../puzzle/CipherTextDisplay";
import { useEffect, useState } from "react";

const encodedTexts = [
  "qh sr he nhq qh sr qoaq ib qoe turbqihn",
  "qh sr he nhq qh sr qoaq ib qoe turbqihn",
  "qh br he nhq qh br qoaq is qoe tursqihn",
  "qh be hr nhq qh be qoaq is qoe tuesqihn",
  "qo be or noq qo be qhaq is qhe tuesqion",
  "to be or not to be that is the question",
];

const PageOne = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    let delay = 500;
    if (currentPage === 0) {
      delay = 1000;
    }
    if (currentPage === encodedTexts.length - 1) {
      delay = 2000;
    }
    const timer = setTimeout(() => {
      setCurrentPage((currentPage + 1) % encodedTexts.length);
    }, delay);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <p>Encoded in each puzzle is a hidden English phrase</p>
      <CipherTextDisplay text={encodedTexts[currentPage]} />
    </div>
  );
};

const PageTwo = () => {
  return (
    <div>
      <p>
        Each puzzle can be solved by swapping a series of letters with another.
        For example, let's say we start with the following text:
      </p>
      <CipherTextDisplay text={encodedTexts[3]} />
      <p>
        |<br />
        Swapping "h" and "o" gets us <br />↓
      </p>
      <CipherTextDisplay text={encodedTexts[4]} />
      <p>
        |<br />
        Swapping t and q gets reveals the puzzle
        <br />↓
      </p>
      <CipherTextDisplay text={encodedTexts[5]} />
    </div>
  );
};

const PageThree = () => {
  const [stateCt, setStateCt] = useState<number>(0);

  useEffect(() => {
    let delay = 1000;
    const timer = setTimeout(() => {
      setStateCt((stateCt + 1) % 4);
    }, delay);
    return () => clearTimeout(timer);
  });

  const ciphertext = stateCt >= 2 ? "abbey" : "baaey";
  const keyAddClass = stateCt % 2 !== 0 ? "pressed" : "";
  return (
    <div className="tutorial-page-three">
      <p>
        To swap two letters in the puzzle, simply press and release them on your
        keyboard simultaneously.
      </p>
      <div className="horiz">
        <CipherTextDisplay text={ciphertext} />
        <div>
          <span className={"key-indicator " + keyAddClass}>a</span>
          <span className={"key-indicator " + keyAddClass}>b</span>
        </div>
      </div>
    </div>
  );
};

const Tutorial = () => (
  <div className="main-content tutorial">
    <PageOne />
    <PageTwo />
    <PageThree />
  </div>
);

export default Tutorial;
