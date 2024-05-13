import React, { useState, useEffect } from "react";

const CompaignForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    compaign_title: "",
    date: "",
    objective: "",
    target_aud: "",
    budjet: ""
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
          <label htmlFor="compaign_title" className="form-label">
          Compaign Title
          </label>
          <input
            type="text"
            className="form-control"
            name="compaign_title"
            placeholder="Compaign Title"
            onChange={handleChange}
            value={formData.compaign_title}
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
            min={new Date().toISOString().split("T")[0]} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="objective" className="form-label">
          Objective
          </label>
          <input
            type="text"
            className="form-control"
            name="objective"
            placeholder="Objective"
            onChange={handleChange}
            value={formData.objective}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="target_aud" className="form-label">
          Target audience
          </label>
          <input
            type="text"
            className="form-control"
            name="target_aud"
            placeholder="Target audience"
            onChange={handleChange}
            value={formData.target_aud}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="budjet" className="form-label">
          Budjet
          </label>
          <input
            type="text"
            className="form-control"
            name="budjet"
            placeholder="Budjet"
            onChange={handleChange}
            value={formData.budjet}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
  
  );
};

export default CompaignForm;
