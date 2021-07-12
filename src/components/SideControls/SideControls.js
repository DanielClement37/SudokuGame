import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import "./SideControls.css";
import { useStore } from "../../store/Store";

export default function SideControls(props) {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [state, dispatch] = useStore();
  const {isSolved, boardState, undoState} = state;

  useEffect(() => {
    let interval = null;
    if (isActive === false && isSolved === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const undoHandler = () => {
    let newBoardState = [...boardState];
    let newUndoState = [...undoState];
    if(newUndoState.length > 1) {
      newBoardState = newUndoState.pop()
      dispatch({
        boardState: newBoardState,
        undoState: newUndoState
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
        <button className="undo-btn" onClick={(e)=>{undoHandler()}}>Undo</button>
        <button className="hint-btn">Hint</button>
        <button className="notes-btn">Notes</button>
        <button className="eraser-btn">Eraser</button>
        <button className="new-game-btn">New Game</button>
        <button id="set-btn" className="settings-btn">
          Settings
        </button>
        <div id="settings-modal" className="side-modal">
          <span class="close">&times;</span>
        </div>
      </div>
    </div>
  );
}

window.onload = function () {
  /*Area below operatess setting modal*/
  var modal = document.getElementById("settings-modal");

  var btn = document.getElementById("set-btn");

  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};
