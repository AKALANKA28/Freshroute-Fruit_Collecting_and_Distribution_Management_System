import React from "react";

const ExpenseForm = ({ handleSubmit, handleOnChange, rest }) => {
    const { date, category, amount, description } = rest || {}; // Destructure the object, or provide an empty object if 'rest' is undefined

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
            value={date}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Category"
            required
            onChange={handleOnChange}
            value={category}
          />
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
            value={amount}
          />
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
            value={description}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;