// Modal.js
import React from "react";
import { IoClose } from "react-icons/io5"; // Import the close icon

const Modal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="onHoldmodal">
        <div className="modal-header">
          <h2 className="modal-title">{contentLabel}</h2>
          <button className="modal-close-button" onClick={onRequestClose}><IoClose /></button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};


export default Modal;
