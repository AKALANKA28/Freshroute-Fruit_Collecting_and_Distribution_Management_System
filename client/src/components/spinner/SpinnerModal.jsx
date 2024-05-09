// SpinnerModal.js
import React from "react";
import { Modal } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import "./spinner.css";

function SpinnerModal({ show }) {
  return (
    <Modal show={show} centered backdrop="static" className="modal-transparent">
      <Modal.Body className="text-center">
        <div className="d-flex justify-content-center align-items-center">
          <LoadingSpinner />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SpinnerModal;
