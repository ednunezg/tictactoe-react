import React, {useState, useEffect} from 'react';
import TicTacToeBoardUI from './TicTacToeBoardUI';
import { nestedCopy } from '../util';

export enum PlayerType {
  NONE,
  CIRCLE,
  CROSS,
}

export enum ViewMode {
  CURRENT,
  HISTORICAL,
}

export type BoardState = Array<Array<PlayerType>>

export type BoardStateHistory = Array<BoardState>

const EmptyBoardState : BoardState = [
  [PlayerType.NONE, PlayerType.NONE, PlayerType.NONE],
  [PlayerType.NONE, PlayerType.NONE, PlayerType.NONE],
  [PlayerType.NONE, PlayerType.NONE, PlayerType.NONE],
]

const StartingPlayer = PlayerType.CIRCLE;

function checkWinner(boardState) {
  // Horizontal traverse
  for (let y = 0; y < 3; y++) {
    if (((boardState[y][0] === boardState[y][1]) && (boardState[y][0] == boardState[y][2])) && boardState[y][0] != PlayerType.NONE) {
      return boardState[y][0]
    }
  }

  // Vertical traverse
  for (let x = 0; x < 3; x++) {
    if (((boardState[0][x] === boardState[1][x]) && (boardState[0][x] == boardState[2][x])) && boardState[0][x] != PlayerType.NONE) {
      return boardState[0][x]
    }
  }

  // Diagonal top-left to bottom-right
  if (((boardState[0][0] === boardState[1][1]) && (boardState[0][0] == boardState[2][2])) && boardState[0][0] != PlayerType.NONE) {
    return boardState[0][0]
  }

  // Diagonal top-right to bottom-left
  if (((boardState[0][2] === boardState[1][1]) && (boardState[0][2] == boardState[2][0])) && boardState[0][2] != PlayerType.NONE) {
    return boardState[0][2]
  }

  // Check if game is over and there is a tie
  let boardIsFull = true
  for (let y=0; y<3; y++) {
    for (let x=0; x<3; x++) {
      if (boardState[y][x] == PlayerType.NONE) {
        boardIsFull = false
        break;
      }
  }}
  if (boardIsFull) {return PlayerType.NONE}

  return null
}


function TicTacToeContainer() {
  const [curMoveNum, setCurMoveNum] = useState<number>(1)
  const [curBoardState, setCurBoardState] = useState<BoardState>(EmptyBoardState)
  const [curPlayer, setCurPlayer] = useState<PlayerType>(StartingPlayer)
  const [history, setHistory] = useState<BoardStateHistory>([EmptyBoardState])
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.CURRENT)
  const [historyViewNum, setHistoryViewNum] = useState<number>(null)
  const [gameWinner, setGameWinner] = useState<PlayerType>(null)

  const boardActionFn = (x:number, y:number) => {
    /*
      1. Decide if move is legal. If not return
      2. Update state and save prev in history
      3. Check if there is a winner
    */

    // Ilegal move
    if (gameWinner !== null || curBoardState[y][x] !== PlayerType.NONE) {
      return
    }

    // Update state and save prev in history
    let newBoardState = nestedCopy(curBoardState)
    newBoardState[y][x] = curPlayer
    setCurBoardState(newBoardState)

    let newHistory = nestedCopy(history)
    newHistory.push(newBoardState)
    setHistory(newHistory)

    // Switch players
    curPlayer == PlayerType.CIRCLE ? setCurPlayer(PlayerType.CROSS) : setCurPlayer(PlayerType.CIRCLE)

    // +1 move number
    setCurMoveNum(curMoveNum + 1)

    // Check if there is a winner
    const winner = checkWinner(newBoardState)
    setGameWinner(winner)



    return
  }

  const restartGameFn = () => {
    setCurMoveNum(1)
    setCurBoardState(EmptyBoardState)
    setCurPlayer(StartingPlayer)
    setHistory([EmptyBoardState])
    setViewMode(ViewMode.CURRENT)
    setHistoryViewNum(null)
    setGameWinner(null)
  }

  let curStateInfo
  if (viewMode == ViewMode.HISTORICAL) {
    curStateInfo = <h4 className="cur-state-info" style={{color: "purple"}}>{`Replaying game move #${historyViewNum}`}</h4>
  } else if (gameWinner !== null) {
    if (gameWinner === PlayerType.NONE) {
      curStateInfo = <h4 className="cur-state-info" style={{color: "red"}}>{`The game ended with a tie!`}</h4>
    } else {
      const gameWinnerStr = gameWinner === PlayerType.CIRCLE ? "circle" : "cross"
      curStateInfo = <h4 className="cur-state-info" style={{color: "red"}}>{`Player ${gameWinnerStr} has won the game!`}</h4>
    }
  } else {
    const curPlayerStr = curPlayer == PlayerType.CIRCLE ? "circle" : "cross"
    curStateInfo = <h4 className="cur-state-info" style={{color: "blue"}}>{`It is ${curPlayerStr}'s turn`}</h4>
  }

  let historySelectButtons = []
  for (let i=0; i<curMoveNum - 1; i++) {
    let pressed = (viewMode == ViewMode.HISTORICAL && i==historyViewNum)
    historySelectButtons.push(
      <a
        role="button"
        href="#"
        className={`history-select-btn btn btn-outline-primary ${pressed ? "active" : ""}`}
        id={`set-history-${i}`}
        onClick={() => {setHistoryViewNum(i); setViewMode(ViewMode.HISTORICAL)}}
        aria-pressed={pressed}
      >
        {i}
      </a>
    )
  }

  let pressed = (viewMode == ViewMode.CURRENT)
  historySelectButtons.push(
    <a
      role="button"
      href="#"
      className={`history-select-btn btn btn-outline-success ${pressed ? "active" : ""}`}
      id={`set-history-current`}
      onClick={() => {setHistoryViewNum(null); setViewMode(ViewMode.CURRENT)}}
      aria-pressed={pressed}
    >
      Current
    </a>
  )

  let displayBoardState
  if (viewMode == ViewMode.CURRENT) {
    displayBoardState = curBoardState
  } else {
    displayBoardState = history[historyViewNum]
  }
  
  return (
    <div className="ttt-container">
      {curStateInfo}

      <TicTacToeBoardUI
        boardState={displayBoardState}
        actionFn={boardActionFn}
      />

      <div className="history-select">
        {historySelectButtons}
      </div>


      <button className="restart-btn btn btn-outline-danger" onClick={restartGameFn}>
        ♺ Restart the game
      </button>

    </div>
  );
}

export default TicTacToeContainer;
