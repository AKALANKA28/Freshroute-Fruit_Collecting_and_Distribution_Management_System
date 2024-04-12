import React, { useState, useEffect } from "react";

const TransportFeeForm =  ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    vehicletype: "",
    date: "",
    maxweight: "",
    pricepkm: "",
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
          <label htmlFor="vehicletype" className="form-label">
            Vehicle Type
          </label>
          <input
            type="text"
            className="form-control"
            name="vehicletype"
            placeholder="Vehicle Type"
            onChange={handleChange}
            value={formData.vehicletype}
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
            onChange={handleChange}
            value={formData.date}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maxweight" className="form-label">
            MaxWeight(kg)
          </label>
          <input
            type="number"
            className="form-control"
            name="maxweight"
            placeholder="MaxWeight(kg)"
            onChange={handleChange}
            value={formData.maxweight}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pricepkm" className="form-label">
            Price per km(Rs)
          </label>
          <input
            type="number"
            className="form-control"
            name="pricepkm"
            placeholder="  Price per km(Rs)"
            onChange={handleChange}
            value={formData.pricepkm}
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
