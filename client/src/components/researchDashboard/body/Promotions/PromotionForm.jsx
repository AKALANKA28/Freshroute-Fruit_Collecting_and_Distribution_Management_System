import React, { useState, useEffect } from "react";

const PromotionForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    farmer_name: "",
    location: "",
    application_no: "",
    required_resouce: ""
  });

  //farmer_name, nic, location, application_no, required_resouce

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
        <label htmlFor="farmer_name" className="form-label">
        Farmer Name
        </label>
        <input
          type="text"
          className="form-control"
          id="farmer_name"
          name="farmer_name"
          placeholder="Farmer Name"
          value={formData.farmer_name}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div className="mb-3">
        <label htmlFor="nic" className="form-label">
          NIC
        </label>
        <input
          type="text"
          className="form-control"
          id="nic"
          name="nic"
          placeholder="NIC"
          value={formData.nic}
          onChange={handleChange}
          required
        />
      </div> */}
      <div className="mb-3">
        <label htmlFor="location" className="form-label">
        Location
        </label>
        <input
          type="text"
          className="form-control"
          id="location"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="application_no" className="form-label">
        Application No
        </label>
        <input
          type="text"
          className="form-control"
          id="application_no"
          name="application_no"
          placeholder="Application No"
          value={formData.application_no}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="required_resouce" className="form-label">
        Required Resouce
        </label>
        <select
            className="form-select"
            name="required_resouce"
            onChange={handleChange}
            value={formData.required_resouce}
            required
          >
            <option value="">Select resource</option>
            <option value="Seeds">Seeds</option>
            <option value="Land">Land</option>
            <option value="Fertilizer">Fertilizer</option>
          </select>
        
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default PromotionForm;
