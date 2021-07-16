import React, {useState} from 'react';

import type {BoardState} from './TicTacToeContainer'
import {PlayerType} from './TicTacToeContainer'

function renderBoardPiece(boardState: BoardState, x: number, y: number) {
  const piece = boardState[y][x]

  if (piece === PlayerType.CIRCLE) {
    return '⭕️'
  } else if (piece === PlayerType.CROSS) {
    return '❌'
  } else {
    return '⬜️'
  }


}

function TicTacToeBoardUI(props) {
  return (
    <div className="board-ui">
      <table className="board-ui-table">
        <tr id="top-row" className="ttt-row">
          <td id="ttt-01" onClick={() => {props.actionFn(0,0)}} className="ttt-slot">{renderBoardPiece(props.boardState, 0, 0)}</td>
          <td id="ttt-00" onClick={() => {props.actionFn(1,0)}} className="ttt-slot">{renderBoardPiece(props.boardState, 1, 0)}</td>
          <td id="ttt-02" onClick={() => {props.actionFn(2,0)}} className="ttt-slot">{renderBoardPiece(props.boardState, 2, 0)}</td>
        </tr>
        <tr id="bottom-row" className="ttt-row">
          <td id="ttt-10" onClick={() => {props.actionFn(0,1)}} className="ttt-slot">{renderBoardPiece(props.boardState, 0, 1)}</td>
          <td id="ttt-11" onClick={() => {props.actionFn(1,1)}} className="ttt-slot">{renderBoardPiece(props.boardState, 1, 1)}</td>
          <td id="ttt-12" onClick={() => {props.actionFn(2,1)}} className="ttt-slot">{renderBoardPiece(props.boardState, 2, 1)}</td>
        </tr>
        <tr id="left-row" className="ttt-row">
          <td id="ttt-20" onClick={() => {props.actionFn(0,2)}} className="ttt-slot">{renderBoardPiece(props.boardState, 0, 2)}</td>
          <td id="ttt-21" onClick={() => {props.actionFn(1,2)}} className="ttt-slot">{renderBoardPiece(props.boardState, 1, 2)}</td>
          <td id="ttt-22" onClick={() => {props.actionFn(2,2)}} className="ttt-slot">{renderBoardPiece(props.boardState, 2, 2)}</td>
        </tr>
      </table>
    </div>
  );
}

export default TicTacToeBoardUI;
