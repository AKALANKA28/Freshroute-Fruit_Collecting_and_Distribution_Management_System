import React, { useState, useEffect } from "react";

const TransportFeeForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    vehicle_no: "",
    type: "",
    conditions: "",
    capacity: "",
    price: "",
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
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Vehicle Type
        </label>
        <input
          type="text"
          className="form-control"
          name="type"
          placeholder="Vehicle Type"
          onChange={handleChange}
          value={formData.type}
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="conditions" className="form-label">
          Conditions
        </label>
        <input
          type="text"
          className="form-control"
          name="conditions"
          placeholder="Conditions"
          onChange={handleChange}
          value={formData.conditions}
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="capacity" className="form-label">
          Capacity(kg)
        </label>
        <input
          type="number"
          className="form-control"
          name="capacity"
          placeholder="Capacity(kg)"
          onChange={handleChange}
          value={formData.capacity}
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price per km(Rs)
        </label>
        <input
          type="number"
          className="form-control"
          name="price"
          placeholder="Price per km(Rs)"
          onChange={handleChange}
          value={formData.price}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default TransportFeeForm;
