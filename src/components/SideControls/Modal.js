import React, { useRef } from "react";
import reactDom from "react-dom";
import './Modal.css';
import './SideControls.css';

export const Modal = ({setShowModal}) => {
    //below closes modal if outside modal is clicked
    const modalRef  = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowModal(false);
        }
    };

    //below creates modal itself
    return reactDom.createPortal(
        <div className="side-controls" ref={modalRef} onClick={closeModal}>
            <div className="side-modal">
                <button onClick={() => setShowModal(false)}>X</button>
            </div>
        </div>,
        document.getElementById("portal")
    );
};