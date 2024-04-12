import React, { useState, useEffect } from "react";

const EmployeeForm =  ({ handleSubmit, initialData }) => {

  const [formData, setFormData] = useState({
    name: "",
    jobrole: "",
    nic: "",
    address: "",
    email: "",
    accno: "",
    bankname: "",
    qualifications: "",
    joineddate: "",
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
            onChange={handleChange}
            value={formData.nic}
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
            onChange={handleChange}
            value={formData.address}
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
            onChange={handleChange}
            value={formData.email}
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
            onChange={handleChange}
            value={formData.accno}
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
            onChange={handleChange}
            value={formData.bankname}
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
            onChange={handleChange}
            value={formData.qualifications}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="joineddate" className="form-label">
            Joined Date
          </label>
          <input
            type="date"
            className="form-control"
            name="joineddate"
            placeholder="Joined Date"
            onChange={handleChange}
            value={formData.joineddate}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    
  );
};

export default EmployeeForm;
