import React, { useState, useEffect } from "react";

const MessageForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    message: "",
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
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    setFormData((prevState) => ({
      ...prevState,
      date: getCurrentDate(),
    }));
  }, []);

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
        <label htmlFor="message" className="form-label">
        Message
        </label>
        <input
          type="text"
          className="form-control"
          name="message"
          placeholder="Message"
          onChange={handleChange}
          value={formData.message}
          required
        />
      </div>

      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default MessageForm;
