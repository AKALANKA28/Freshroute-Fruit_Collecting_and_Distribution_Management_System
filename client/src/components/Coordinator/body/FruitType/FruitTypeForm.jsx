import React, { useState, useEffect } from "react";

const FruitTypeForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
  }, []); // Empty dependency array to run only once after the component mounts

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
          Fruit Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Fruit Name"
          onChange={handleChange}
          value={formData.name}
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
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default FruitTypeForm;
