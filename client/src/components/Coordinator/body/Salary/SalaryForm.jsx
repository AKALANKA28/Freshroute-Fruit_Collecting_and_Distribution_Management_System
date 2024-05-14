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

    if (name === "jobrole" && /[^\p{L}\s]/u.test(value)) {
      return; 
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    setFormData(prevState => ({
      ...prevState,
      date: getCurrentDate()
    }));
  }, []);

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
          placeholder="Job Role"
          value={formData.jobrole}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-control"
          id="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="salary" className="form-label">
          Salary
        </label>
        <input
          type="number"
          className="form-control"
          id="salary"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default SalaryForm;
