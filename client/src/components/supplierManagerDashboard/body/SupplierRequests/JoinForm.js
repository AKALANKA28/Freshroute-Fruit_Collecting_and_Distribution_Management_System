import React, { useState, useEffect } from "react";

const JoinForm = ({ handleSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    NIC: "",
    fieldArea: "",
    landDeed: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "landDeed" ? files[0] : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Check if there are any errors before submitting
    // You can add your validation logic here if needed
    handleSubmit(formData);
    onClose(); // Close the modal after form submission
  };

  return (
    <div className="join-form">
      <h2>Join with us</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="NIC">NIC</label>
          <input
            type="text"
            name="NIC"
            id="NIC"
            value={formData.NIC}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fieldArea">Field Area</label>
          <input
            type="text"
            name="fieldArea"
            id="fieldArea"
            value={formData.fieldArea}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="landDeed">Land Deed (PDF)</label>
          <input
            type="file"
            name="landDeed"
            id="landDeed"
            onChange={handleChange}
            accept=".pdf"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text-area"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JoinForm;
