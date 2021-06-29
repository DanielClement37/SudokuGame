import React from 'react'
import './SideControls.css'

export default function SideControls() {
    return (
        <div className="side-controls">
            <div className="timer-container">
                <div className="timer-item">
                    <h3>EASY</h3>
                </div>
                <div className="timer-item">
                    <h1>03:13</h1>
                </div>
            </div>
            <div className="controls-container">
                <button className="undo-btn">Undo</button>
                <button className="hint-btn">Hint</button>
                <button className="notes-btn">Notes</button>
                <button className="eraser-btn">Eraser</button>
                <button className="new-game-btn">New Game</button>
                <button className="settings-btn">Settings</button>
            </div>
        </div>
    )
}
