import React, { useState, useEffect } from "react";
import cityCoordinates from "./cityCoordinates.json"

const FarmerForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    NIC: "",
    username: "",
    name: "",
    email: "",
    mobile: "",
    city: "",
    latitude: "",
    longitude: "",
    lane: "",
  });

  const [formErrors, setFormErrors] = useState({
    NIC: "",
    username: "",
    name: "",
    email: "",
    mobile: "",
    city: "",
    lane: "",
  });

  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    // Validate input on change
    validateInput(name, value);
    // If city is changed, fetch coordinates
    if (name === "city") {
      fetchCoordinates(value);
    }
  };

  const fetchCoordinates = async (city) => {
    try {
      const response = await fetch(`/api/cities?city=${city}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            latitude: data[0].latitude,
            longitude: data[0].longitude,
          }));
        }
      } else {
        throw new Error("City coordinates not found");
      }
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
    }
  };

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "NIC":
        error = /^(?:[0-9]{9}[vVxX]|[0-9]{12})?$/.test(value) ? '' : 'Invalid NIC';
        break;
      case "username":
        error = value.trim().length === 0 ? "Username is required" : (/\s/.test(value) ? "Username cannot contain spaces" : "");
        break;
      case "name":
        error = /^[a-zA-Z\s]*$/.test(value) ? (value.length < 1 ? 'Name is required' : '') : 'Name should contain only letters and spaces';
        break;
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        break;
      case "mobile":
        error = /^[0-9]{10}$/.test(value) ? '' : 'Mobile number should be 10 digits';
        break;  
      case "city":
        error = value.trim().length === 0 ? "City is required" : "";
        break;
      case "lane":
        error = value.trim().length === 0 ? "Lane is required" : "";
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

  const handleCityChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      city: value,
    }));
    setShowSuggestions(true);
    const filteredSuggestions = cityCoordinates.filter((city) =>
      city.city.toLowerCase().startsWith(value.toLowerCase())
    );
    setCitySuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (city) => {
    setFormData((prev) => ({
      ...prev,
      city: city.city,
      latitude: city.latitude,
      longitude: city.longitude,
    }));
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="NIC" className="form-label">
          Farmer NIC
        </label>
        <input
          type="text"
          className={`form-control ${formErrors.NIC && "is-invalid"}`}
          name="NIC"
          placeholder="Enter NIC"
          id="NIC"
          required
          onChange={handleChange}
          value={formData.NIC}
        />
        {formErrors.NIC && <div className="invalid-feedback">{formErrors.NIC}</div>}
      </div>
      
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className={`form-control ${formErrors.username && "is-invalid"}`}
          name="username"
          placeholder="Enter Username"
          required
          onChange={handleChange}
          value={formData.username}
        />
        {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className={`form-control ${formErrors.name && "is-invalid"}`}
          name="name"
          placeholder="Enter Name"
          required
          onChange={handleChange}
          value={formData.name}
        />
        {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className={`form-control ${formErrors.email && "is-invalid"}`}
          name="email"
          placeholder="example@domain.com"
          required
          onChange={handleChange}
          value={formData.email}
        />
        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="mobile" className="form-label">
          Mobile
        </label>
        <input
          type="text"
          className="form-control"
          name="mobile"
          placeholder="Enter Mobile Number"
          required
          onChange={handleChange}
          value={formData.mobile}
        />
        {formErrors.mobile && <div className="invalid-feedback">{formErrors.mobile}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="city" className="form-label">
          City
        </label>
        <input
          type="text"
          className={`form-control ${formErrors.city && "is-invalid"}`}
          name="city"
          placeholder="Enter City"
          required
          onChange={handleCityChange}
          value={formData.city}
        />
        {showSuggestions && citySuggestions.length > 0 && (
          <ul className="list-group">
            {citySuggestions.map((city, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handleSuggestionClick(city)}
              >
                {city.city}
              </li>
            ))}
          </ul>
        )}
        {formErrors.city && <div className="invalid-feedback">{formErrors.city}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="lane" className="form-label">
          Lane
        </label>
        <input
          type="text"
          className={`form-control ${formErrors.lane && "is-invalid"}`}
          name="lane"
          placeholder="Enter Lane"
          onChange={handleChange}
          value={formData.lane}
        />
        {formErrors.lane && <div className="invalid-feedback">{formErrors.lane}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FarmerForm;
