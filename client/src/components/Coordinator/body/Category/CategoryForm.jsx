import React, { useState, useEffect } from "react";

const CategoryForm = ({ handleSubmit, initialData }) => {

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
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="fruit" className="form-label">
            Fruit
          </label>
          <input
            type="text"
            className="form-control"
            name="fruit"
            placeholder="Fruit"
            onChange={handleChange}
            value={formData.fruit}
            required
          />
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
         <label htmlFor="quality" className="form-label">Quality</label>
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

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default CategoryForm;
