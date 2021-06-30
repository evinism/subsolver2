import { useReducer, useState } from "react";
import Puzzle from "../puzzle/Puzzle";
import EventStream from "../EventStream";
import plaintexts from "../plaintexts";
import { choose } from "../util";
import "./Classic.css";
import { getAllSolved, setSolved } from "../solvedStore";

type GameModifiers = {
  hideSpaces?: boolean;
};

interface ClassicProps {
  gameModifiers?: GameModifiers;
}

const chooseUnsolvedIfPossible = () => {
  let solved = getAllSolved();
  if (plaintexts.length === solved.length) {
    return choose(plaintexts);
  }
  const unsolved = plaintexts.filter(
    (plaintext) => !solved.includes(plaintext.id)
  );
  return choose(unsolved);
};

const Classic = ({ gameModifiers }: ClassicProps) => {
  const [plainText, setPlainText] = useState(chooseUnsolvedIfPossible());
  const [events, setEvents] = useState<string[]>([
    `Started puzzle #${plainText.id}`,
  ]);
  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  const pushEvent = (ev: string) => {
    const MAX_EVENTS = 64;
    const newEvents = events.slice(0, MAX_EVENTS);
    newEvents.unshift(ev);
    setEvents(newEvents);
  };

  const startNewPuzzle = () => {
    setPlainText(chooseUnsolvedIfPossible());
    pushEvent(`Started puzzle #${plainText.id}`);
  };

  return (
    <article className="main-content classic-page">
      <header className="puzzle-header">
        <span>Puzzle #{plainText.id}</span>
        <span>
          {getAllSolved().length} / {plaintexts.length} Solved
        </span>
      </header>
      <Puzzle
        plaintext={plainText}
        key={plainText.text}
        onComplete={() => {
          setSolved(plainText.id);
          forceUpdate();
        }}
        pushEvent={pushEvent}
        hideSpaces={gameModifiers?.hideSpaces}
        solvedOverlay={
          <div className="success-overlay">
            <div>
              <p>{plainText.text}</p>
              <div className="success-author-origin">
                <i>--{plainText.author}</i>
                <br />
                {plainText.origin}
              </div>
            </div>
            <div>
              <button onClick={startNewPuzzle}>Next Puzzle</button>
            </div>
          </div>
        }
      />
      <p>
        Press two letters simultaneously to swap them!
        <br />
        Press one letter with space to toggle whether it's locked!
      </p>
      <EventStream events={events} />
    </article>
  );
};

export default Classic;
