import "./App.css";
import Puzzle from "./puzzle/Puzzle";
import plaintexts from "./plaintexts";
import { useState } from "react";

function choose<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function App() {
  const [plainText] = useState(choose(plaintexts));
  return (
    <div className="App">
      <header>
        <h1>Subsolver 2</h1>
        <p>
          Press two letters simultaneously to swap them!
          <br />
          Press one letter with space to lock it in place!
        </p>
      </header>
      <Puzzle
        plaintext={plainText}
        key={plainText.text}
        onComplete={() => console.log("WOO")}
      />
    </div>
  );
}

export default App;
