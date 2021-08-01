import React from "react";
import './Timer.css';

const Timer = (props) => {
  return (
      <div className="timer">
        <span className="digits">
          {("0" + Math.floor((props.time / 60) % 60)).slice(-2)}:
        </span>
        <span className="digits">
          {("0" + Math.floor((props.time ) % 60)).slice(-2)}
        </span>
      </div>
  );
};

export default Timer;
