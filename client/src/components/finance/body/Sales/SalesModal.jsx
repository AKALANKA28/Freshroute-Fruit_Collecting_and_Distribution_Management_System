import React, { useState } from 'react';
import SalesForm from './SalesForm';
import { Modal } from "react-bootstrap";

const SalesModal = ({ 
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
          <SalesForm handleSubmit={handleSubmit} initialData={formData} />
        </Modal.Body>
      </Modal>
    );
  };

export default SalesModal;
