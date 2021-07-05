import "./Tutorial.css";
import CipherTextDisplay from "../puzzle/CipherTextDisplay";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { isTouchscreen } from "../util";

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

  const helpText = !isTouchscreen()
    ? "To swap two letters in the puzzle, simply press and release them on your keyboard simultaneously."
    : "To swap two letters in the puzzle, drag from one letter to another on the virtual keyboard.";

  return (
    <div className="tutorial-page-three">
      <p>{helpText}</p>
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

const PageFour = () => {
  const [stateCt, setStateCt] = useState<number>(0);

  useEffect(() => {
    let delay = 1000;
    const timer = setTimeout(() => {
      setStateCt((stateCt + 1) % 4);
    }, delay);
    return () => clearTimeout(timer);
  });

  const helpText = !isTouchscreen()
    ? "To lock a letter in place so you can't accidentaly change it, press and release that letter along with space."
    : "On mobile, drag between the Lock button on the keyboard to whatever letter you want to lock or unlock.";

  const lockedLetters: Set<string> = stateCt >= 2 ? new Set(["t"]) : new Set();
  const keyAddClass = stateCt % 2 !== 0 ? "pressed" : "";
  return (
    <div className="tutorial-page-four">
      <p>{helpText}</p>
      <div className="horiz">
        <CipherTextDisplay
          text="tx be xr nxt tx be that is the question"
          lockedLetters={lockedLetters}
        />
        <div>
          <span className={"key-indicator " + keyAddClass}>t</span>
          <span className={"key-indicator " + keyAddClass}>_</span>
        </div>
      </div>
      <p> Locked letters can be unlocked using the same method</p>
    </div>
  );
};

const pages = [PageOne, PageTwo, PageThree, PageFour];

const Tutorial = () => {
  const [page, setPage] = useState<number>(0);

  const history = useHistory();
  const CurrentPage = pages[page];
  const isFirstPage = page === 0;
  const isLastPage = page === pages.length - 1;

  const nextPageHandler =
    !isLastPage &&
    (() => {
      setPage(page + 1);
    });

  const prevPageHandler =
    !isFirstPage &&
    (() => {
      setPage(page - 1);
    });

  const backToRootHandler =
    isLastPage &&
    (() => {
      history.push("/");
    });

  return (
    <div className="tutorial">
      <div className="current-page-container">
        <CurrentPage />
      </div>
      <div className="tutorial-nav-buttons">
        <Button
          onClick={prevPageHandler || undefined}
          disabled={!prevPageHandler}
        >
          Previous Page
        </Button>
        {nextPageHandler && (
          <Button onClick={nextPageHandler}>Next Page</Button>
        )}
        {backToRootHandler && (
          <Button onClick={backToRootHandler}>Back to Home</Button>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
