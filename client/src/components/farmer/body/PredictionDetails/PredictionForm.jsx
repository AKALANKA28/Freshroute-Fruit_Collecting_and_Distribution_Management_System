import React, { useState, useEffect } from "react";

const PredictionForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    fruitType: "",
    quality: "",
    quantity: "",
    price: "",
    dateCanBeGiven: "",
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
               Fruit Type
           </label>
           <input
            type="text"
            className="form-control"
            name="fruitType"
            id="fruitType"
            placeholder="Fruit Type"
            required
            onChange={handleChange}
            value={formData.fruitType}
          />
        </div>

        <div className="mb-3">
           <label htmlFor="date" className="form-label">
           Quality
           </label>
           <input
            type="text"
            className="form-control"
            name="quality"
            placeholder="Quality"
            required
            onChange={handleChange}
            value={formData.quality}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
          Quantity
          </label>
          <input
            type="text"
            className="form-control"
            name="quantity"
            placeholder="Quantity"
            required
            onChange={handleChange}
            value={formData.quantity}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            name="price"
            placeholder="Price"
            required
            onChange={handleChange}
            value={formData.price}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Date Can Be Given
          </label>
          <input
            type="Date"
            className="form-control"
            name="dateCanBeGiven"
            placeholder="Date Can Be Given"
            required
            onChange={handleChange}
            value={formData.dateCanBeGiven}
          />
        </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default PredictionForm;