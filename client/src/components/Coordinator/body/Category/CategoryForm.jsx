import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8070/";

const CategoryForm = ({ handleSubmit, initialData }) => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/FruitType/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const [formData, setFormData] = useState({
    fruit: "",
    category: "",
    date: "",
    quality: "",
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

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    setFormData(prevState => ({
      ...prevState,
      date: getCurrentDate()
    }));
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="fruit" className="form-label">
            Fruit
          </label>
          <select
            className="form-select"
            name="fruit"
            onChange={handleChange}
            value={formData.fruit}
            required
          >
            <option value="">Select Fruit</option>
            {dataList.length ? (
              dataList.map((fruit, index) => (
                <option key={index} value={fruit.name}>
                  {fruit.name}
                </option>
              ))
            ) : (
              <option value="">No fruits</option>
            )}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            value={formData.category}
            required
          />
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
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
