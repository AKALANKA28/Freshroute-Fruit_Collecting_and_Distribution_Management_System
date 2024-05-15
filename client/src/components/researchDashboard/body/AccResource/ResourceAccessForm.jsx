import React, { useState, useEffect } from 'react';
//import './ResourceAccessForm.css';
import SearchBar from './SearchBar';

const ResourceAccessForm = ({ handleSubmit, initialData }) => {
    // Define state variables to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        farmName: '',
        contactNumber: '',
        location: '',
        resourceType: '',
        otherResource: '',
        farmSize: '',
        fruitType: '',
        productionCapacity: '',
        additionalInfo: '',
        resourceDescription: ''
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
        <h2>Resource Access Application Form</h2>
        <h4>Applicant Information</h4>
          <label htmlFor="name" className="form-label">
          Your Name:
          </label>
          <input
            type="name"
            className="form-control"
            name="name"
            placeholder="name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="email"
            onChange={handleChange}
            value={formData.email}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">
          Contact Number
          </label>
          <input
            type="text"
            className="form-control"
            name="contactNumber"
            placeholder="contactNumber"
            onChange={handleChange}
            value={formData.contactNumber}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
          Location (City/Region):
          </label>
          <input
            type="text"
            className="form-control"
            name="location"
            placeholder="location"
            onChange={handleChange}
            value={formData.location}
            required
          />
        </div>
        <div className="mb-3">
        <h3>Farm Information</h3>
          <label htmlFor="farmSize" className="form-label">
          Size of Farm (in acres/hectares):
          </label>
          <input
            type="text"
            className="form-control"
            name="farmSize"
            placeholder="farmSize"
            onChange={handleChange}
            value={formData.farmSize}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fruitType" className="form-label">
          Type of Fruit Cultivated:
          </label>
          <input
            type="text"
            className="form-control"
            name="fruitType"
            placeholder="fruitType"
            onChange={handleChange}
            value={formData.fruitType}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productionCapacity" className="form-label">
          Current Production Capacity:
          </label>
          <input
            type="text"
            className="form-control"
            name="productionCapacity"
            placeholder="productionCapacity"
            onChange={handleChange}
            value={formData.productionCapacity}
            required
          />
        </div>
        <div className="mb-3">
        <h3>Resources Request</h3>
          <label>
          Type of resource requested:
          
          <select name="resourceType" value={formData.resourceType} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="credit">Credit Facilities</option>
                            <option value="land">Land</option>
                            <option value="seeds">Seeds</option>
                            <option value="fertilizer">Fertilizer</option>
                            <option value="other">Other</option>
                        </select>
                        </label>
                        {formData.resourceType === 'other' && (
                        <label>
                            Please specify other resource:
                            <input type="text" name="otherResource" value={formData.otherResource} onChange={handleChange} required />
                        </label>
                    )}
        </div>
        <div className="mb-3">
        <h3>Details of Resource Requirement</h3>
          <label htmlFor="resourceDescription" className="form-label">
          Description of the resources you need:
          </label>
          <input
            type="text"
            className="form-control"
            name="resourceDescription"
            placeholder="resourceDescription"
            onChange={handleChange}
            value={formData.resourceDescription}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          CONFIRM
        </button>
      </form>
        
    );
};

export default ResourceAccessForm;
