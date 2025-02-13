import PropTypes from "prop-types";
import React from "react";

function Modal({ isOpen, onClose, children }) {
  /* 
   * Check if the modal is open or not.
   * If it's not open, return null to prevent rendering.
   */
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// propType Validation
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
