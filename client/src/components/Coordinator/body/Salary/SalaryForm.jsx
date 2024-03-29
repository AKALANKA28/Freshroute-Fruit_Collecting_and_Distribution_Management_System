import React from "react";

const SalaryForm = ({ handleSubmit, handleOnChange, data }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            value={data.jobrole}
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
