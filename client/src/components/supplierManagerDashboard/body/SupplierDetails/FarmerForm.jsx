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
    let newValue = value;
  
    if (name === "NIC") {
      // Show NIC type based on the first two digits
      let nicType = '';
      if (value.length >= 1) {
        const firstTwoDigits = value.substring(0, 2);
        nicType = firstTwoDigits === "20" ? "New NIC" : /^[1-9]\d/.test(firstTwoDigits) ? "Old NIC" : "";
      }
        
      // Remove special characters from NIC
      newValue = newValue.replace(/[^\dVvXx]/g, ""); // Allow only digits, v, V, x, X
        
      // Restrict the number of digits based on NIC type
      if (nicType === "Old NIC" && newValue.length > 10) {
        newValue = newValue.slice(0, 10);
      } else if (nicType === "New NIC" && newValue.length > 12) {
        newValue = newValue.slice(0, 12);
      }
  
      // Allow only one instance of v, V, x, or X
      const allowedChars = ['v', 'V', 'x', 'X'];
      const charCount = newValue.split('').filter(char => allowedChars.includes(char)).length;
      if (charCount > 1) {
        newValue = newValue.substring(0, newValue.lastIndexOf(newValue.charAt(newValue.length - 1)));
      }
  
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
        nicType: nicType
      }));
    } else if (name === "name" || name === "city") {
      // Remove space as the first character
      newValue = value.replace(/^\s+/, '');
      // Allow only letters and spaces
      newValue = newValue.replace(/[^a-zA-Z\s]/g, "");
        
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
    } else if (name === "mobile") {
      // Allow only numbers and ensure the first digit is 0
      newValue = newValue.replace(/[^\d]/g, '');
      if (!newValue.startsWith("0")) {
        newValue = newValue.substring(1); // Remove first character if it's not 0
      }
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
    } else if (name === "email") {
      // Remove uppercase letters
      newValue = newValue.toLowerCase();
      // Don't allow @ as the first character
      if (newValue.startsWith("@") || newValue.includes(" ")) {
        return;
      }
      // Allow only @ as a special character
      if (newValue.split("@").length > 2) {
        return; // Prevent more than one @ symbol
      }
      newValue = newValue.replace(/[^a-z0-9@.]/g, '');
      // Remove leading space
      newValue = newValue.replace(/^\s+/, '');
  
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
    } else if (name === "username") {
      // Remove space as the first character
      newValue = value.replace(/^\s+/, '');
      // Don't allow space
      newValue = newValue.replace(/\s/g, '');
      // Remove special characters
      newValue = newValue.replace(/[^\w]/g, '');
      // Remove leading numbers
      if (/^\d/.test(newValue)) {
        newValue = '';
      }
        
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
    }
    
    validateField(name, newValue);
    
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

  const validateNIC = (nic) => {
    const oldNICRegex = /^(?:[0-9]{9}[vVxX])$/;
    const newNICRegex = /^(?:20(?:0[0-9]|1[0-9]|2[0-4])[0-9]{7}[0-9])$/;
    if (!oldNICRegex.test(nic) && !newNICRegex.test(nic)) {
      return "Invalid NIC format";
    } else if (nic.length === 12) {
      const year = parseInt(nic.substring(0, 4));
      if (year > new Date().getFullYear()) {
        return "NIC's year should be lower than or equal to the current year";
      }
    }
    return "";
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = /^[a-zA-Z\s]*$/.test(value) ? (value.length < 1 ? 'Name is required' : '') : 'Name should contain only letters and spaces';
        break;
      case "username":
        error = value.trim().length === 0 ? "Username is required" : (/\s/.test(value) ? "Username cannot contain spaces" : "");
        break;  
      case 'email':
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        break;
      case 'mobile':
        error = /^[0-9]{10}$/.test(value) && value[0] === '0' ? '' : 'Mobile number should be 10 digits and start with 0';
        break;
      case 'city':
        error = value.length < 1 ? 'City is required' : '';
        break;
      case "NIC":
        error = validateNIC(value);
        break;
      case "lane":
        error = value.trim().length === 0 ? "Lane is required" : "";
        break;
      default:
        break;
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
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
      {/* <div className="mb-3">
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
          maxLength={12}
        />
        {formErrors.NIC && <div className="invalid-feedback">{formErrors.NIC}</div>}
      </div> */}
      
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className={`form-control ${formErrors.username && "is-invalid"}`}
          name="username"
          placeholder="Enter Username"
          onChange={handleChange}
          value={formData.username}
          maxLength={20}
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
          maxLength={50}
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
          maxLength={10}
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
          maxLength={20}
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
          maxLength={50}
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
