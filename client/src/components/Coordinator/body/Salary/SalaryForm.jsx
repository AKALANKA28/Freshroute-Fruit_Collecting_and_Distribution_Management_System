import React, { useState, useEffect } from "react";

const SalaryForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    jobrole: "",
    date: "",
    salary: ""
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
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="jobrole" className="form-label">
          Job Role
        </label>
        <input
          type="text"
          className="form-control"
          id="jobrole"
          name="jobrole"
          value={formData.jobrole}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="text"
          className="form-control"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="salary" className="form-label">
          Salary
        </label>
        <input
          type="text"
          className="form-control"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default SalaryForm;
