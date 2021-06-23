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
                <div className="undo-btn"></div>
                <div className="hint-btn"></div>
                <div className="notes-btn"></div>
                <div className="eraser-btn"></div>
                <div className="new-game-btn"></div>
                <div className="settings-btn"></div>
            </div>
        </div>
    )
}
