// ./client/src/components/Coordinator/body/SalaryForm.js
import React from "react";

const SalaryForm = ({ handleSubmit, handleOnChange, data }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="jobroll" className="form-label">
            Job Roll
          </label>
          <input
            type="text"
            className="form-control"
            name="jobroll"
            placeholder="Job Roll"
            onChange={handleOnChange}
            value={data.jobroll}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="text"
            className="form-control"
            name="date"
            placeholder="Date"
            onChange={handleOnChange}
            value={data.date}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary(Rs)
          </label>
          <input
            type="number"
            className="form-control"
            name="salary"
            placeholder="Salary(Rs)"
            onChange={handleOnChange}
            value={data.salary}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default SalaryForm;
