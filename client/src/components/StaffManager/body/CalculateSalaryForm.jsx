// ./client/src/components/StaffManager/body/CalculateSalaryForm.js
import React from "react";

const CalculateSalaryForm = ({ handleSubmit, handleOnChange, rest }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Employee Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Employee Name"
            onChange={handleOnChange}
            value={rest.name}
            required
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
            onChange={handleOnChange}
            value={rest.jobrole}
            required
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
            onChange={handleOnChange}
            value={rest.salary}
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
            onChange={handleOnChange}
            value={rest.allowance}
            
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
            onChange={handleOnChange}
            value={rest.epfe}
            
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
            onChange={handleOnChange}
            value={rest.epfr}
            
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
            onChange={handleOnChange}
            value={rest.etf}
            
          />
        </div>
       
       
        
       
        <button type="submit" className="btn btn-success">
          Calculate
          <i class="bi bi-calculator"></i>
        </button>
      </form>
    </div>
  );
};

export default CalculateSalaryForm;
