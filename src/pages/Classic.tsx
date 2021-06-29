import { useState } from "react";
import Puzzle from "../puzzle/Puzzle";
import EventStream from "../EventStream";
import plaintexts from "../plaintexts";
import { choose } from "../util";
import "./Classic.css";

const Classic = () => {
  const [plainText, setPlainText] = useState(choose(plaintexts));
  const [events, setEvents] = useState<string[]>([
    `Started puzzle #${plainText.id}`,
  ]);
  const pushEvent = (ev: string) => {
    const MAX_EVENTS = 64;
    const newEvents = events.slice(0, MAX_EVENTS);
    newEvents.unshift(ev);
    setEvents(newEvents);
  };

  const startNewPuzzle = () => {
    setPlainText(choose(plaintexts));
    pushEvent(`Started puzzle #${plainText.id}`);
  };

  return (
    <article className="main-content classic-page">
      <p>
        Press two letters simultaneously to swap them!
        <br />
        Press one letter with space to toggle whether it's locked!
      </p>
      <Puzzle
        plaintext={plainText}
        key={plainText.text}
        onComplete={() => console.log("WOO")}
        pushEvent={pushEvent}
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
      <EventStream events={events} />
    </article>
  );
};

export default Classic;
