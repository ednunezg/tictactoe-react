import React from 'react';
import './App.css';

import TicTacToeContainer from './components/TicTacToeContainer';

function App() {
  return (
    <div className="container">
      <h1>ReactJS - Tic Tac Toe</h1>
      <br/>
      <TicTacToeContainer />
    </div>
  );
}

export default App;
