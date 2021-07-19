import React, { useState, useEffect } from "react";
import { isPropertySignature } from "typescript";
//import reactDom from "react-dom";
import './Modal.css';
import './SideControls.css';
import { useStore } from "../../store/Store";
import { chooseDifficulty, generateNewBoard } from "../../store/GameReducer";
import { remainingValues } from "../../utils/GetRemainingNums";

export default function Modal(props) {

    const [state, dispatch] = useStore();
   
    const difficultyHandler = (difficulty) => {

        let [removedVals, startingBoard, finalBoard] = chooseDifficulty(difficulty)

        dispatch({
          boardState: startingBoard,
          initBoardState: startingBoard.map((inner) => inner.slice()),
          solvedBoardState: finalBoard,
          removedVals: removedVals,
          selectedTile: {
            row: null,
            col: null,
            value: null,
            unit: null
          },
          remainingNums: remainingValues(startingBoard),
          isSolved: false,
          undoState: [startingBoard.map((copy) => copy.slice())],
          difficulty: difficulty
        });
        //generates a new board in the same difficulty for later use
        generateNewBoard(difficulty)
    }
    

    const type = props.name
    if (!props.open) return null;

    if (type === "isSettings") {
        return (
            <>
                <div>
                    <button className='close' onClick={props.onClose}>x</button>
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
                </div>
            </>
        );
    }

    if (type === "isNewGame") {
        return (
            <>
                <div>
                    <button className='close' onClick={props.onClose}>x</button>
                    <div className="side-modal">
                        <div className="side-modal-header">New Game</div>
                        <button className="new-game-modal-btn"onClick={(e) => {
                            difficultyHandler('Beginner')
                        }}
                        >
                        Beginner</button>
                        <button className="new-game-modal-btn"onClick={(e) => {
                            difficultyHandler('Intermediate')
                        }}
                        >
                        Intermediate</button>
                        <button className="new-game-modal-btn"onClick={(e) => {
                            difficultyHandler('Advanced')
                        }}
                        >
                        Hard</button>
                        <button className="new-game-modal-btn"onClick={(e) => {
                            difficultyHandler('Expert')
                        }}
                        >
                        Expert</button>
                    </div>
                </div>
            </>
        );
    }
}