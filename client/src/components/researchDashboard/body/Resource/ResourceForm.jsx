import React, { useState, useEffect } from "react";

const ResourceForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    resource_type: "",
    description: "",
    qty: ""
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
        Resource Type
        </label>
        <input
          type="text"
          className="form-control"
          id="resource_type"
          name="resource_type"
          placeholder="Resource Type"
          value={formData.resource_type}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
        Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="qty" className="form-label">
        Quantity Available
        </label>
        <input
          type="text"
          className="form-control"
          id="qty"
          name="qty"
          placeholder="Available Resources"
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

export default ResourceForm;
