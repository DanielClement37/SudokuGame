import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import "./SideControls.css";
import { useStore } from "../../store/Store";
import { actionTypes } from "../../store/types";
import "./Modal.css";
import Modal from "./Modal";
import { getRowNum } from "../../utils/Conveter";
import { remainingValues } from "../../utils/GetRemainingNums";
import { generatedCheck } from "../../utils/GeneratedCheck";

export default function SideControls(props) {
  const [time, setTime] = useState(0);
  const [state, dispatch] = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const { isSolved, boardState, undoState, selectedTile, initBoardState } =
    state;

  useEffect(() => {
    let interval = null;
    if (isSolved === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isSolved]);

  const eraseHandler = () => {
    //check to see if tile was an intial tile
    if (!generatedCheck(selectedTile, initBoardState)) {
      let newBoardState = [...boardState]; //copy the current board state to newBoardState
      const rowNum = getRowNum(selectedTile.row); //get the row of the selected tile
      newBoardState[rowNum - 1][parseInt(selectedTile.col) - 1] = 0; //set the value at the selected tile = 0
      const remainingNums = remainingValues(newBoardState); //get remaining nums
      dispatch({
        type: actionTypes.UPDATE_TILE_VALUE,
        boardState: newBoardState,
        remainingNums: remainingNums,
        selectedTile: {
          row: selectedTile.row,
          col: selectedTile.col,
          unit: selectedTile.unit,
          value: 0,
        },
      });
    }
  };

  const undoHandler = () => {
    let newUndoState = undoState.map((copy) => copy.slice());

    if (undoState.length > 1) {
      newUndoState.pop();
      let newBoardState = newUndoState.slice(newUndoState.length - 1);
      const remainingNums = remainingValues(newBoardState[0]);
      dispatch({
        type: actionTypes.UNDO_MOVE,
        boardState: newBoardState[0],
        undoState: newUndoState,
        remainingNums: remainingNums,
      });
    }
  };

  return (
    <div className="side-controls">
      <div className="timer-container">
        <div className="timer-item">
          <h3>EASY</h3>
        </div>
        <div className="timer-item">
          <Timer time={time} />
        </div>
      </div>
      <div className="controls-container">
        <button
          className="undo-btn"
          onClick={(e) => {
            undoHandler();
          }}
        >
          Undo
        </button>
        <button className="hint-btn">Hint</button>
        <button className="notes-btn">Notes</button>
        <button
          className="eraser-btn"
          onClick={(e) => {
            eraseHandler();
          }}
        >
          Eraser
        </button>
        <button className="new-game-btn">New Game</button>
        <button className="settings-btn" onClick={() => setIsOpen(true)}>
          Settings
        </button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="side-modal">
              <div className="side-modal-header">Settings</div>
              <div className="side-modal-text">Error Limits</div>
                <label class="switch">
                  <input type="checkbox"></input>
                  <span class="slider"></span>
                </label>
              <div className="side-modal-text">Auto - Detect Mistakes</div>
              <label class="switch">
                  <input type="checkbox"></input>
                  <span class="slider"></span>
                </label>
              <div className="side-modal-text">Auto - Update Hints</div>
              <label class="switch">
                  <input type="checkbox"></input>
                  <span class="slider"></span>
                </label>
              <div className="side-modal-text">Light / Dark Mode</div>
              <label class="switch">
                  <input type="checkbox"></input>
                  <span class="slider"></span>
                </label>
            </div>
        </Modal>
      </div>
    </div>
  );
}
