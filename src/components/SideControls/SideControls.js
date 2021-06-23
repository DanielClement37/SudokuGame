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
                <div className="undo-btn"><h4>Undo</h4></div>
                <div className="hint-btn"><h4>Hint</h4></div>
                <div className="notes-btn"><h4>Notes</h4></div>
                <div className="eraser-btn"><h4>Eraser</h4></div>
                <div className="new-game-btn"><h4>New Game</h4></div>
                <div className="settings-btn"><h4>Settings</h4></div>
            </div>
        </div>
    )
}
