import React, { useState } from "react";
import Timer from "./Timer";
import "./SideControls.css";
import "./Modal.css";
import { Modal } from "./Modal";

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

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
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
        <button id="ng-btn" className="new-game-btn" onClick={openModal}>New Game</button>
          {showModal ? <Modal setShowModal={setShowModal} /> : null}
        <button id="set-btn" className="settings-btn" onClick={openModal}>Settings</button>
          {showModal ? <Modal setShowModal={setShowModal} /> : null}  
      </div>
    </div>
  );
}

/*window.onload = function () {
  /*Area below operatess setting modal*/
  /*Modal refers to settings, modal2 refers to new game. close[i], i = occurence of close
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

/*below needs fixing, closes modal when modal is clicked instead of when clicking outside modal
  window.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }

      if (event.target === modal2) {
          modal2.style.display = "none";
      }
  }
}*/