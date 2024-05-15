import React from "react";
import { Modal } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";

const ExpenseModal = ({
  modalOpen,
  handleModalClose,
  handleSubmit,
  formData,


}) => {
// eslint-disable-next-line
const modalTitle = formData ? "Add" : "Edit";

  return (
    <Modal show={modalOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>
      <Modal.Title>{modalTitle} Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Render the ExpenseForm component with appropriate props */}
        <ExpenseForm handleSubmit={handleSubmit} initialData={formData} />
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseModal;
