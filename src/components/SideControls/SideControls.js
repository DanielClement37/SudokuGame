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
import { classNames } from "../../utils/classNames";

export default function SideControls(props) {
  const [time, setTime] = useState(0);
  const [state, dispatch] = useStore();
  const [isOpen, setIsOpen] = useState(false); //useStates for modals. Each needs its own to display properly.
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpenWin, setIsOpenWin] = useState(false);
  const {
    isSolved,
    boardState,
    solvedBoardState,
    undoState,
    selectedTile,
    initBoardState,
    difficulty,
    isNotesMode,
    remainingHints
  } = state;

  useEffect(() => {
    let interval = null;
    if (isSolved === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setIsOpenWin(true); //Where win is opened
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
        type: actionTypes.ERASE_TILE,
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
      newUndoState[0] = initBoardState.map((inner) => inner.slice());

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
    if(remainingHints === 0) 
      return;
    let newBoardState = [...boardState]; // copy of the current board state
    let count = 0;
    let correctMistake = false;
    // Priority 1 : Correct Mistakes on Board

    // iterate through current board; if current cell does not match answer key, update and exit loop
    for (var i = 0; i < 9; i++){
      if(count === 1)
          break;
      for (var j = 0; j < 9; j++){
        if(newBoardState[i][j] !== 0) {
          if(newBoardState[i][j] !== solvedBoardState[i][j])
          {
            newBoardState[i][j] = solvedBoardState[i][j];
            count = 1;
            correctMistake = true;
            break;
          }
        }
      }
    }
    count = 0;
    //if a mistake was not corrected then just fill in an empty tile
    if(correctMistake === false) {
      // Priority 2: (If there are No Mistakes to Correct) Fill a Blank Cell
      // iterate through current board; if null cell found, update and dispatch
      for (i = 0; i < 9; i++){
        if(count === 1)
          break;
        for (j = 0; j < 9; j++){
          if(newBoardState[i][j] === 0) {
            newBoardState[i][j] = solvedBoardState[i][j];
            count = 1;
            break;
          }
        }
      }
    }
    
    const remainingNums = remainingValues(newBoardState)
    const newRemainingHints = remainingHints - 1;
    
    dispatch({
      type: actionTypes.GIVE_HINT,
      boardState: newBoardState,
      remainingNums: remainingNums,
      remainingHints: newRemainingHints
    });

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
        <Modal
          name="isWin"
          open={isOpenWin}
          onClose={() => setIsOpenWin(false)}
          time={time}
        ></Modal>
        <button
          className="undo-btn"
          onClick={(e) => {
            undoHandler();
          }}
        >
          Undo
        </button>
        <button 
          className="hint-btn"
          onClick={(e) => {
            hintHandler()
          }}
        >
          Hint
        </button>
        <button
          className={classNames(
            "notes-btn",
            isNotesMode ? "notes-on" : "notes-off"
          )}
          onClick={(e) => {
            //notesHandler();
          }}
        >
          Notes
        </button>
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
          resetHandler={() => setTime(0)}
        />
        <button className="settings-btn" onClick={() => setIsOpen(true)}>
          Settings
        </button>
        <Modal
          name="isSettings"
          onChange={(event) => props.onChange(event)}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
