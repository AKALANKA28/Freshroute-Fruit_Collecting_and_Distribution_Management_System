import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const [fruitList, setFruitList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  useEffect(() => {
    fetchFruitNames();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      fetchSubCategories(initialData.fruit);
    }
  }, [initialData]);

  const fetchFruitNames = async () => {
    try {
      const response = await axios.get("/Category/fruitdetails");
      setFruitList(response.data);
    } catch (error) {
      console.error("Error fetching fruit names:", error);
    }
  };

  const fetchSubCategories = async (selectedFruit) => {
    try {
      const response = await axios.get(`/Category/subcategories/${selectedFruit}`);
      setSubCategoryList(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "quantity" || name === "price") {
    // Allow numbers and one decimal point
    newValue = newValue.replace(/[^0-9.]/g, '');
    // Allow only one decimal point
    const decimalCount = newValue.split('.').length - 1;
    if (decimalCount > 1) {
      newValue = newValue.substring(0, newValue.lastIndexOf('.'));
    } else if (decimalCount === 1 && newValue.split('.')[1].length > 2) {
      newValue = newValue.slice(0, -1);
    }setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  }

    if (name === "fruit") {
      fetchSubCategories(newValue);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    // Validate input on change
    validateInput(name, newValue);
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
        <select
          className="form-select"
          name="fruit"
          id="fruit"
          value={formData.fruit}
          onChange={handleChange}
          required
        >
          <option value="">Select Fruit</option>
          {fruitList.map((fruit) => (
            <option key={fruit} value={fruit}>
              {fruit}
            </option>
          ))}
        </select>
        {formErrors.fruit && <div className="invalid-feedback">{formErrors.fruit}</div>}
      </div>
      
      <div className="mb-3">
        <label htmlFor="subCategory" className="form-label">
          Sub Category
        </label>
        <select
          className="form-select"
          name="subCategory"
          id="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
          required
        >
          <option value="">Select Sub Category</option>
          {subCategoryList.map((subCategory) => (
            <option key={subCategory} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </select>
        {formErrors.subCategory && <div className="invalid-feedback">{formErrors.subCategory}</div>}
      </div>

      <div className="mb-3">
          <label htmlFor="quality" className="form-label">
            Quality
          </label>
          <select
            className="form-select"
            name="quality"
            onChange={handleChange}
            value={formData.quality}
            required
          >
            <option value="">Select Quality</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          {formErrors.quality && <div className="invalid-feedback">{formErrors.quality}</div>}
        </div>

      <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
          Total Quantity(kg)
          </label>
          <input
            type="text"
            className="form-control"
            name="quantity"
            placeholder="Enter Quantity"
            required
            onChange={handleChange}
            value={formData.quantity}
            maxLength={15}
          />
          {formErrors.quantity && <div className="invalid-feedback">{formErrors.quantity}</div>}
      </div>

      <div className="mb-3">
          <label htmlFor="priceForOne" className="form-label">
            Price for 1kg (Rs)
          </label>
          <input
            type="text"
            className="form-control"
            name="price"
            placeholder="Enter Price of One"
            required
            onChange={handleChange}
            value={formData.price}
            maxLength={15}
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
