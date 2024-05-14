import React, { useState, useEffect } from "react";
import axios from "axios";

// Set base URL for axios requests
axios.defaults.baseURL = "http://localhost:8070/";

// Define CalculateSalaryForm component
const CalculateSalaryForm = ({ handleSubmit, initialData }) => {
  // State variable for form data
  const [formData, setFormData] = useState({
    name: "",
    jobrole: "",
    nic: "",
    salary: "", // This will be populated with the fetched salary value
    allowance: "",
    epfe: 8,
    epfr: 12,
    etf: 3,
  });

  // Fetch salary data when initial data is provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      fetchSalaryData(initialData.jobrole);
    }
  }, [initialData]);

  // Function to fetch salary data
  const fetchSalaryData = async (jobrole) => {
    try {
      const response = await axios.get(`/api/salary/${jobrole}`); // Modify the endpoint URL as per your backend API
      const { salary } = response.data;
      
      
      setFormData((prevFormData) => ({
        ...prevFormData,
        salary: salary // Set the salary in the form state
      }));
    } catch (error) {
      console.error("Error fetching salary data:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    handleSubmit(formData);
  };

  // JSX
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Employee Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          readOnly
        />
      </div>

      <div className="mb-3">
        <label htmlFor="jobrole" className="form-label">
          Job Role
        </label>
        <input
          type="text"
          className="form-control"
          name="jobrole"
          placeholder="Job Role"
          value={formData.jobrole}
          onChange={handleChange}
          readOnly
        />
      </div>

      <div className="mb-3">
        <label htmlFor="salary" className="form-label">
          Salary
        </label>
        <input
          type="number"
          className="form-control"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
          readOnly
        />
      </div>

      <div className="mb-3">
        <label htmlFor="allowance" className="form-label">
          Allowance
        </label>
        <input
          type="number"
          className="form-control"
          name="allowance"
          placeholder="Allowance"
          value={formData.allowance}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="epfe" className="form-label">
          EPF - Employee Contribution
        </label>
        <select
          className="form-control"
          name="epfe"
          value={formData.epfe}
          onChange={handleChange}
        >
          <option value="">Select EPF Employee Contribution</option>
          <option value="8">8%</option>
          <option value="10">10%</option>
          <option value="12">12%</option>
          
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="epfr" className="form-label">
          EPF - Employer Contribution
        </label>
        <select
          className="form-control"
          name="epfr"
          value={formData.epfr}
          onChange={handleChange}
        >
          <option value="">Select EPF Employer Contribution</option>
          <option value="8">8%</option>
          <option value="10">10%</option>
          <option value="12">12%</option>
         
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="etf" className="form-label">
          ETF - Employer Contribution
        </label>
        <select
          className="form-control"
          name="etf"
          value={formData.etf}
          onChange={handleChange}
        >
          <option value="">Select ETF Employer Contribution</option>
          <option value="3">3%</option>
          <option value="5">5%</option>
          <option value="7">7%</option>
          
        </select>
        </div>
      <button type="submit" className="btn btn-success">
        Calculate <i className="bi bi-calculator"></i>
      </button>
    </form>
  );
};

export default CalculateSalaryForm;
