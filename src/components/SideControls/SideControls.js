import React, { useState } from "react";
import Timer from "./Timer";
import "./SideControls.css";

export default function SideControls() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);

  React.useEffect(() => {
    let interval = null;
    if (isActive === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else{
        clearInterval(interval);
    }
    return()=>{
        clearInterval(interval);
    }
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
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
        <button className="undo-btn">Undo</button>
        <button className="hint-btn">Hint</button>
        <button className="notes-btn">Notes</button>
        <button className="eraser-btn">Eraser</button>
        <button id="ng-btn" className="new-game-btn">New Game</button>
        <div id="new-game-modal" className="side-modal">
                    <span class="close">&times;</span>
                </div>
        <button id="set-btn" className="settings-btn">Settings</button>
                <div id="settings-modal" className="side-modal">
                    <span class="close">&times;</span>
                </div>
      </div>
    </div>
  );
}

window.onload = function () {
  /*Area below operatess setting modal*/
  /*Modal refers to settings, modal2 refers to new game. close[i], i = occurence of close*/
  var modal = document.getElementById("settings-modal");
  var modal2 = document.getElementById("new-game-modal");

  var btn = document.getElementById("set-btn");
  var btn2 = document.getElementById("ng-btn");

  var span = document.getElementsByClassName("close")[1];
  var span2 = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
      modal.style.display = "block";
  }
  btn2.onclick = function () {
    modal2.style.display = "block";
  }

  span.onclick = function () {
      modal.style.display = "none";
  }
  span2.onclick = function () {
    modal2.style.display = "none";
}

  window.onclick = function (event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }

      if (event.target == modal2) {
          modal.style.display = "none";
      }
  }
}