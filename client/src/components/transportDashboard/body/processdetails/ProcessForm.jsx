import React, { useState, useEffect } from "react";

const ProcessForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    process_ID:"",
    vehicle_no:"",
    driver_name:"",
    current_status:"",
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
        process ID
        </label>
        <input
          type="text"
          className="form-control"
          id="process_ID"
          name="process_ID"
          placeholder="Process ID"
          value={formData.resource_type}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Vehicle Number
        </label>
        <input
          type="text"
          className="form-control"
          id="vehicle_no"
          name="vehicle_no"
          placeholder="Vehicle Number"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Driver name
        </label>
        <input
          type="text"
          className="form-control"
          id="driver_name"
          name="driver_name"
          placeholder="Driver name"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Current status
        </label>
        <input
          type="text"
          className="form-control"
          id="current_status"
          name="current_status"
          placeholder=" Current status"
          value={formData.description}
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

export default ProcessForm;
