import React, { useState, useEffect } from "react";

const VehicleForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    vehicle_no:"",
    type:"",
    conditions:"",
    capacity : "",
    owner_name:"",
    nic:"",
    email:"",
    phone:"",
    Bank:"",
    Branch:"",
    account_no:"",
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
        <label htmlFor="resource_type" className="form-label">
        Vehicle Number
        </label>
        <input
          type="text"
          className="form-control"
          id="vehicle_no"
          name="vehicle_no"
          placeholder="Vehicle Number"
          value={formData.resource_type}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Type
        </label>
        <input
          type="text"
          className="form-control"
          id="type"
          name="type"
          placeholder="Type"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Conditions
        </label>
        <input
          type="text"
          className="form-control"
          id="conditions"
          name="condition"
          placeholder="Conditions"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Capacity
        </label>
        <input
          type="text"
          className="form-control"
          id="capacity"
          name="capacity"
          placeholder="Capacity"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Owner Name
        </label>
        <input
          type="text"
          className="form-control"
          id="owner_name"
          name="owner_name"
          placeholder="Owner Name"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        NIC
        </label>
        <input
          type="text"
          className="form-control"
          id="nic"
          name="nic"
          placeholder="NIC"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Email
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Phone
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          placeholder="Phone"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Date
        </label>
        <input
          type="text"
          className="form-control"
          id="date"
          name="date"
          placeholder="Date"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Bank
        </label>
        <input
          type="text"
          className="form-control"
          id="Bank"
          name="Bank"
          placeholder="Bank"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      
      <div className="mb-3">
        <label htmlFor="qty" className="form-label">
        Branch
        </label>
        <input
          type="text"
          className="form-control"
          id="Branch"
          name="Branch"
          placeholder="Branch"
          value={formData.qty}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="qty" className="form-label">
        Account Number
        </label>
        <input
          type="text"
          className="form-control"
          id="account_no"
          name="account_no"
          placeholder="Account Number"
          value={formData.qty}
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

export default VehicleForm;
