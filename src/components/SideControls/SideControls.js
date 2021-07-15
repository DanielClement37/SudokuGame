import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import "./SideControls.css";
import { useStore } from "../../store/Store";
import { actionTypes } from "../../store/types";
import "./Modal.css";
import Modal from "./Modal";

export default function SideControls(props) {
  const [time, setTime] = useState(0);
  const [state, dispatch] = useStore();
  const { isSolved, undoState } = state;
  const [isOpen, setIsOpen] = useState(false);

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

  const handleStart = () => {};

  const handleReset = () => {
    setTime(0);
  };

  const undoHandler = () => {
    let newUndoState = undoState.map((copy) => copy.slice());

    if (undoState.length > 1) {
      newUndoState.pop();
      let newBoardState = newUndoState.slice(newUndoState.length - 1);
      dispatch({
        type: actionTypes.UNDO_MOVE,
        boardState: newBoardState[0],
        undoState: newUndoState,
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
        <button className="eraser-btn">Eraser</button>
        <button className="new-game-btn">New Game</button>
        <button className="settings-btn" onClick={() => setIsOpen(true)}>
          Settings
        </button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="side-modal">
            <div className="side-modal-header">Settings</div>
            <div className="side-modal-text">Example</div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
