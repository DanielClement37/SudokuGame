import React from "react";
import { isPropertySignature } from "typescript";
//import reactDom from "react-dom";
import './Modal.css';
import './SideControls.css';

export default function Modal(props) {

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
                        <button className="new-game-modal-btn">Beginner</button>
                        <button className="new-game-modal-btn">Intermediate</button>
                        <button className="new-game-modal-btn">Hard</button>
                        <button className="new-game-modal-btn">Expert</button>
                    </div>
                </div>
            </>
        );
    }

}