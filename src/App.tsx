import "./App.css";
import Puzzle from "./Puzzle";
import plaintexts from "./plaintexts";
import { useState } from "react";

function choose<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function App() {
  const [plainText] = useState(choose(plaintexts));
  return (
    <div className="App">
      <h1>Subsolver 2</h1>
      <p>Press down two letters simultaneously to swap them!</p>
      <hr />
      <Puzzle
        text={plainText.plaintext}
        key={plainText.plaintext}
        onComplete={() => console.log("WOO")}
      />
    </div>
  );
}

export default App;
