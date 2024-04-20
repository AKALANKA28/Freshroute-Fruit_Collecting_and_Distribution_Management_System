import React, { useEffect, useState } from "react";

const ExpenseForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
    // status: "",


  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="datetime-local"
            className="form-control"
            name="date"
            placeholder="Date"
            onChange={handleChange}
            value={formData.date}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            name="category"
            className="form-control"
            onChange={handleChange}
            value={formData.category || ""}
          >
            
            <option value="">Select Category</option>
            <option value="Transport">Transport</option>
            <option value="Employee">Employee</option>
            <option value="Research">Research</option>
            <option value="Promotion">Promotion</option>
          </select>
         
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
            onChange={handleChange}
            value={formData.amount || ""}
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
            onChange={handleChange}
            value={formData.description || ""}
          />
          
        </div>
     
        <div className="d-flex justify-content-end border-top">
          {/* <button type="submit" className="btn btn-secondary "> Cancel </button> */}
          <button type="submit" className="btn btn-success"> Submit </button>
       </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
