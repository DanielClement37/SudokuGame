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
  const [isOpen, setIsOpen] = useState(false); //useStates for modals. Each needs its own to display properly.
  const [isOpen2, setIsOpen2] = useState(false);
  const {
    isSolved,
    boardState,
    undoState,
    selectedTile,
    initBoardState,
    difficulty,
  } = state;

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
    if (selectedTile.row === null) {
      return;
    }
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

/* Function:    Provide a hint by correcting the first mistake or filling the first unfilled spot on the game board
   Criteria:    None Required
   Parameters:  None?
   Return:      None?
*/
  const hintHandler = () => {
    
    let newBoardState = [...boardState]; // copy of the current board state

    // Priority 1 : Correct Mistakes on Board

    // iterate through current board; if current cell does not match answer key, update and exit loop
    for (var i = 0; i < 9; i++){
      for (var j = 0; j < 9; j++){
        //if (newBoardState[i][j] !== [i][j] of answer key && newBoardState[i][j] !== 0){
          // newBoardState[i][j] = answerkey[i][j];
          // dispatch here ? decrement hintcount?
          // });
        //}
      }
    }

    // if did not dispatch before, should exit loop and enter following loop

    // Priority 2: (If there are No Mistakes to Correct) Fill a Blank Cell

    // iterate through current board; if null cell found, update and dispatch
    for (i = 0; i < 9; i++){
      for (j = 0; j < 9; j++){
        //if (newBoardState[i][j] == 0){
        //  newBoardState[i][j] = answerKey[i][j];
        //  dispatch here? decrement hintcount?   
        //}
      }
    }

    /* dispatch({
      type: actionTypes.UPDATE_TILE_VALUE,
      boardState: newBoardState,
      remainingNums: remainingNums,
      
      / is this needed? do I need to locate tile in array and then make it selected tile somehow? /
      selectedTile: {
        row: selectedTile.row,
        col: selectedTile.col,
        unit: selectedTile.unit,
        value: 0,                 <- would not be zero, would be coordinaing answer key value
      },
    }); */

  }

  return (
    <div className="side-controls">
      <div className="timer-container">
        <div className="timer-item">{difficulty}</div>
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
        <button className="new-game-btn" onClick={() => setIsOpen2(true)}>
          New Game
        </button>
        <Modal
          name="isNewGame"
          open={isOpen2}
          onClose={() => setIsOpen2(false)}
        ></Modal>
        <button className="settings-btn" onClick={() => setIsOpen(true)}>
          Settings
        </button>
        <Modal
          name="isSettings"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        ></Modal>
      </div>
    </div>
  );
}
