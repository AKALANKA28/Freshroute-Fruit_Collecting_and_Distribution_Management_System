import React, { useState, useEffect } from "react";

const FarmerForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    NIC: "",
    username: "",
    name: "",
    email: "",
    city: "",
    lane: "",
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
        <label htmlFor="jobrole" className="form-label">
          Farmer NIC
        </label>
             <input
            type="text"
            className="form-control"
            name="NIC"
            placeholder="Farmer NIC"
            id = "NIC"
            required
            onChange={handleChange}
            value={formData.NIC}
        />
      </div>
      
      <div className="mb-3">
           <label htmlFor="date" className="form-label">
             Username
           </label>
           <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            value={formData.username}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            name="city"
            placeholder="City"
            required
            onChange={handleChange}
            value={formData.city}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Lane
          </label>
          <input
            type="text"
            className="form-control"
            name="lane"
            placeholder="Lane"
            required
            onChange={handleChange}
            value={formData.lane}
          />
        </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FarmerForm;