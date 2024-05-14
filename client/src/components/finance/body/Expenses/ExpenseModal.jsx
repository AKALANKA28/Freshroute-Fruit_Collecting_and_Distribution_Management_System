import React from "react";
import { Modal } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";

const ExpenseModal = ({
  modalOpen,
  handleModalClose,
  handleSubmit,
  formData,
}) => {
  return (
    <Modal show={modalOpen} onHide={handleModalClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{formData ? "Edit" : "Add"} Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Render the ExpenseForm component with appropriate props */}
        <ExpenseForm handleSubmit={handleSubmit} initialData={formData} />
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseModal;
