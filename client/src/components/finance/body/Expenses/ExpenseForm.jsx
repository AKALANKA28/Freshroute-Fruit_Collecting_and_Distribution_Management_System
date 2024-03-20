import React from "react";

const ExpenseForm = ({ handleSubmit, handleOnChange, err = {}, rest = {} }) => {
  const { date, category, amount, description } = rest;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="text"
            className="form-control"
            name="date"
            placeholder="Date"
            required
            onChange={handleOnChange}
            value={date || ""}
          />
          {err.date && (
            <div className="text-danger">hhhhhhh</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            name="category"
            className="form-control"
            onChange={handleOnChange}
            value={category || ""}
          >
            
            <option value="">Select Category</option>
            <option value="Transport">Transport</option>
            <option value="Employee">Employee</option>
            <option value="Research">Research</option>
            <option value="Promotion">Promotion</option>
          </select>
          {err.category && (
            <div className="text-danger">{err.category}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="text"
            className="form-control"
            name="amount"
            placeholder="Amount"
            required
            onChange={handleOnChange}
            value={amount || ""}
          />
          {err.amount && (
            <div className="text-danger">{err.amount}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Description"
            required
            onChange={handleOnChange}
            value={description || ""}
          />
          
        </div>
        {err.description && (
            <div className="text-danger">{err.description}</div>
          )}
        {/* <button type="submit" className="btn btn-primary">
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default ExpenseForm;
