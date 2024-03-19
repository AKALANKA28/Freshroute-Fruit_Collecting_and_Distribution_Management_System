import React from "react";
import ExpenseForm from "./ExpenseForm";

const ExpenseFormModal = ({ show, handleClose, handleSubmit, handleOnChange, rest }) => {
  const { _id, date, category, amount, description } = rest || {}; // Destructure the object, or provide an empty object if 'rest' is undefined

  // const showHideClassName = show ? "modal fade show" : "modal fade";

  return (
    <div className={show ? "modal fade show" : "modal fade"} id="expenseModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{_id ? "Edit Expense" : "Add Expense"}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <ExpenseForm
              handleSubmit={handleSubmit} 
              handleOnChange={handleOnChange} 
              rest={rest} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFormModal;