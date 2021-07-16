import React, { useState } from "react";
//import reactDom from "react-dom";
import './Modal.css';
import './SideControls.css';

export default function Modal({ open, children, onClose }) {

    if (!open) return null;
    
    return (
        <>
            <div>
                <button className='close' onClick={onClose}>x</button>
                {children}
            </div>
        </>
    );   
}