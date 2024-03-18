import React from "react";

const EmployeeForm = ({ handleSubmit, handleOnChange, rest }) => {
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
          <label htmlFor="nic" className="form-label">
            NIC
          </label>
          <input
            type="text"
            className="form-control"
            name="nic"
            placeholder="NIC"
            onChange={handleOnChange}
            value={rest.nic}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Address"
            onChange={handleOnChange}
            value={rest.address}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Email Address"
            onChange={handleOnChange}
            value={rest.email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="accno" className="form-label">
            Account Number
          </label>
          <input
            type="number"
            className="form-control"
            name="accno"
            placeholder="Account Number"
            onChange={handleOnChange}
            value={rest.accno}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bankname" className="form-label">
            Bank Name
          </label>
          <input
            type="text"
            className="form-control"
            name="bankname"
            placeholder="Bank Name"
            onChange={handleOnChange}
            value={rest.bankname}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="qualifications" className="form-label">
            Qualifications
          </label>
          <input
            type="text"
            className="form-control"
            name="qualifications"
            placeholder="Qualifications"
            onChange={handleOnChange}
            value={rest.qualifications}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="joineddate" className="form-label">
            Joined Date
          </label>
          <input
            type="text"
            className="form-control"
            name="joineddate"
            placeholder="Joined Date"
            onChange={handleOnChange}
            value={rest.joineddate}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
