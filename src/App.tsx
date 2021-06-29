import "./App.css";
import Puzzle from "./puzzle/Puzzle";
import plaintexts from "./plaintexts";
import { useState } from "react";
import EventStream from "./EventStream";

function choose<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function App() {
  const [plainText, setPlainText] = useState(choose(plaintexts));
  const [events, setEvents] = useState<string[]>([]);
  const pushEvent = (ev: string) => {
    const MAX_EVENTS = 64;
    const newEvents = events.slice(0, MAX_EVENTS);
    newEvents.unshift(ev);
    setEvents(newEvents);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Subsolver: a substitution cipher solving game</h1>
        <p>
          Press two letters simultaneously to swap them!
          <br />
          Press one letter with space to toggle whether it's locked!
        </p>
      </header>
      <article className="main-content">
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
                <button onClick={() => setPlainText(choose(plaintexts))}>
                  Next Puzzle
                </button>
              </div>
            </div>
          }
        />
        <EventStream events={events} />
      </article>
    </div>
  );
}

export default App;
