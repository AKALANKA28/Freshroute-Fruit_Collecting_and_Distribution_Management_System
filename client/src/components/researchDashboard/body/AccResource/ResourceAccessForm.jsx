import React, { useState } from 'react';
//import './ResourceAccessForm.css';
import SearchBar from './SearchBar';

const ResourceAccessForm = () => {
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

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here (e.g., send formData to an API)
        console.log('Form submitted:', formData);
    };

    return (
        <div className="form-container">
            {/* Render the SearchBar component */}
            {/* <SearchBar /> */}

            <form className="resource-form" onSubmit={handleSubmit}>
                <h2>Resource Access Application Form</h2>

                {/* Applicant Information */}
                <div className="form-section">
                    <div className="appInfor">
                    <h3>Applicant Information</h3>
                    <label>
                        Your Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    {/* <label>
                        Farm Name:
                        <input type="text" name="farmName" value={formData.farmName} onChange={handleChange} required />
                    </label> */}
                    <label>
                        Contact Number:
                        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                    </label>
                    <label>
                        Location (City/Region):
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                    </label>
                    </div>
                    {/* Farm Information */}
                    <div className="farm">
                    <h3>Farm Information</h3>
                    <label>
                        Size of Farm (in acres/hectares):
                        <input type="text" name="farmSize" value={formData.farmSize} onChange={handleChange} required />
                    </label>
                    <label>
                        Type of Fruit Cultivated:
                        <input type="text" name="fruitType" value={formData.fruitType} onChange={handleChange} required />
                    </label>
                    <label>
                        Current Production Capacity:
                        <input type="text" name="productionCapacity" value={formData.productionCapacity} onChange={handleChange} required />
                    </label>
                    
                    </div>
                </div>

                {/* Farm Information */}
                <div className="form-section">
                    
                </div>

                {/* Resources Request */}
                <div className="form-section">
                   <div className="resRequest">
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
            
                </div>

                

                {/* Details of Resource Requirement */}
                <div className="form-section">
                    <div className="detailsRes">
                    <h3>Details of Resource Requirement</h3>
                    <label>
                        Description of the resources you need:
                        <textarea name="resourceDescription" value={formData.resourceDescription} onChange={handleChange} required />
                    </label>
                    </div>
                </div>

                {/* Supporting Documents */}
                <div className="form-section">
                    <div className="supportDoc">
                    <h3>Supporting Documents (if required)</h3>
                    <label>
                        Proof of ownership/Lease for land:
                        <input type="file" name="ownershipProof" onChange={handleChange} />
                    </label>
                    <label>
                        Financial Statement:
                        <input type="file" name="financialStatement" onChange={handleChange} />
                    </label>
                    <label>
                        Business Plan:
                        <input type="file" name="businessPlan" onChange={handleChange} />
                    </label>
                    </div>
                </div>

                {/* Declaration and Submit Button */}
                <div className="declaration-section">
                    <div className="discript">
                    <p>
                        I hereby declare that the information given in this application form is true and correct to the best of my knowledge. I understand that providing false information may result in the rejection of my application.
                    </p>
                    <button type="submit">CONFIRM</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResourceAccessForm;
