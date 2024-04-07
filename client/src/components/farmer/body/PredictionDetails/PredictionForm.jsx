import React, { useState, useEffect } from "react";

const PredictionForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    fruit: "",
    subCategory: "",
    quality: "",
    quantity: "",
    price: "",
    dateCanBeGiven: "",
  });

  const [formErrors, setFormErrors] = useState({
    fruit: "",
    subCategory: "",
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
      [name]: value,
    }));
    // Validate input on change
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "fruit":
        error = value.trim().length === 0 ? "Name of Fruit is required" : "";
        break;
      case "subCategory":
        error = value.trim().length === 0 ? "Sub Category is required" : "";
        break;
      case "quality":
        error = value.trim().length === 0 ? "Quality is required" : "";
        break;
      case "quantity":
        error = value.trim().length === 0 ? "Quantity is required" : "";
        break;
      case "price":
        error = value.trim().length === 0 ? "Price is required" : "";
        break;
      case "dateCanBeGiven":
        error = value.trim().length === 0 ? "Date can be given is required" : "";
        break;
      default:
        break;
    }
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Check if there are any errors before submitting
    if (Object.values(formErrors).every((error) => error === "")) {
      handleSubmit(formData);
    } else {
      alert("Please fill out the form correctly");
    }
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="fruit" className="form-label">
          Fruit
        </label>
        <input
          type="text"
          className={`form-control ${formErrors.fruit && "is-invalid"}`}
          name="fruit"
          id="fruit"
          placeholder="Enter Name of Fruit"
          required
          onChange={handleChange}
          value={formData.fruit}
        />
        {formErrors.fruit && <div className="invalid-feedback">{formErrors.fruit}</div>}
      </div>
      
      <div className="mb-3">
        <label htmlFor="subCategory" className="form-label">
          Sub Category
        </label>
        <input
          type="text"
          className={`form-control ${formErrors.subCategory && "is-invalid"}`}
          name="subCategory"
          id="subCategory"
          placeholder="Enter Name of Fruit"
          required
          onChange={handleChange}
          value={formData.subCategory}
        />
        {formErrors.subCategory && <div className="invalid-feedback">{formErrors.subCategory}</div>}
      </div>

      <div className="mb-3">
            <label htmlFor="quality" className="form-label">
            Quality
            </label>
            <input
            type="text"
            className="form-control"
            name="quality"
            placeholder="Enter Quality"
            required
            onChange={handleChange}
            value={formData.quality}
          />
          {formErrors.quality && <div className="invalid-feedback">{formErrors.quality}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
          Quantity
          </label>
          <input
            type="text"
            className="form-control"
            name="quantity"
            placeholder="Enter Quantity"
            required
            onChange={handleChange}
            value={formData.quantity}
          />
          {formErrors.quantity && <div className="invalid-feedback">{formErrors.quantity}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="priceForOne" className="form-label">
            Price of One
          </label>
          <input
            type="text"
            className="form-control"
            name="price"
            placeholder="Enter Price of One"
            required
            onChange={handleChange}
            value={formData.price}
          />
          {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="dateCanBeGiven" className="form-label">
          Date Can Be Given
          </label>
          <input
            type="date"
            className="form-control"
            name="dateCanBeGiven"
            placeholder="Date Can Be Given"
            min={today}
            required
            onChange={handleChange}
            value={formData.dateCanBeGiven}
          />
          {formErrors.dateCanBeGiven && <div className="invalid-feedback">{formErrors.dateCanBeGiven}</div>}
        </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default PredictionForm;