import React, { useState, useEffect } from "react";

const CalculateSalaryForm = ({ handleSubmit, initialData }) => {

  const [formData, setFormData] = useState({
    name: "",
    jobrole: "",
    nic: "",
    salary: "",
    allowance: "",
    epfe: "",
    epfr: "",
    etf: "",
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
          <label htmlFor="name" className="form-label">
            Employee Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Employee Name"
            onChange={handleChange}
            value={formData.name}
            required
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="jobrole" className="form-label">
            Job Role
          </label>
          <input
            type="text"
            className="form-control"
            name="jobrole"
            placeholder="Job Role"
            onChange={handleChange}
            value={formData.jobrole}
            required
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Basic
          </label>
          <input
            type="number"
            className="form-control"
            name="salary"
            placeholder="Basic"
            onChange={handleChange}
            value={formData.salary}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="allowance" className="form-label">
            Allowance
          </label>
          <input
            type="number"
            className="form-control"
            name="allowance"
            placeholder="Allowance"
            onChange={handleChange}
            value={formData.allowance}
            
          />
        </div>

        <div className="mb-3">
          <label htmlFor="epfe" className="form-label">
          EPF - Employee Contribution
          </label>
          <input
            type="number"
            className="form-control"
            name="epfe"
            placeholder="EPF - Employee Contribution"
            onChange={handleChange}
            value={formData.epfe}
            
          />
        </div>

        <div className="mb-3">
          <label htmlFor="epfr" className="form-label">
          EPF - Employer Contribution
          </label>
          <input
            type="number"
            className="form-control"
            name="epfr"
            placeholder="EPF - Employer Contribution"
            onChange={handleChange}
            value={formData.epfr}
            
          />
        </div>

        <div className="mb-3">
          <label htmlFor="etf" className="form-label">
          ETF -  Employer Contribution
          </label>
          <input
            type="number"
            className="form-control"
            name="etf"
            placeholder="ETF -  Employer Contribution"
            onChange={handleChange}
            value={formData.etf}
            
          />
        </div>
       
       
        
       
        <button type="submit" className="btn btn-success">
          Calculate<i class="bi bi-calculator"></i>
          
        </button>
      </form>
    
  );
};

export default CalculateSalaryForm;
