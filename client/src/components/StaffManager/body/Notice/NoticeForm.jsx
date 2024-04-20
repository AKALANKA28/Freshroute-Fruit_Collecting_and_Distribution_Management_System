import React, { useState, useEffect } from "react";

const NoticeForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    description: "",
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
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={formData.title}
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

export default NoticeForm;
