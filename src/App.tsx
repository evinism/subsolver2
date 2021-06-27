import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserInputHandler from './UserInputHandler';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <UserInputHandler />
        </p>
      </header>
    </div>
  );
}

export default App;
