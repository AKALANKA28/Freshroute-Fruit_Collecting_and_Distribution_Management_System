import React, { useState, useEffect } from "react";

const CategoryPriceForm = ({ handleSubmit, initialData }) => {

  const [formData, setFormData] = useState({
   
    weight: "",
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
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default CategoryPriceForm;
