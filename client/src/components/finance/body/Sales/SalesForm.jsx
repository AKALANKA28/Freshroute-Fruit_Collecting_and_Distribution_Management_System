import React, { useState, useEffect } from "react";

const SalesForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    date: "",
    fruit_name: "",
    amount: "",
    paid: "",
    due: "",
    status: "",


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

      
      <div className="container">
      <div className="d-flex align-items-center gap-15">

        <div className="row">
          
        <div className="col-6">
        <div className="mb-3">
          <label htmlFor="customer_name" className="form-label">
          Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            name="customer_name"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.customer_name}
            
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
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fruit_name" className="form-label">
          Fruit Name
          </label>
          <input
            type="text"
            className="form-control"
            name="fruit_name"
            placeholder="Mango"
            onChange={handleChange}
            value={formData.fruit_name}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
           Amount
          </label>
          <input
            type="text"
            className="form-control"
            name="amount"
            placeholder="10 000.00"
            onChange={handleChange}
            value={formData.amount}
          />
        </div>
        </div>
        <div className="col-6">
        <div className="mb-3">
          <label htmlFor="paid" className="form-label">
          Paid
          </label>
          <input
            type="text"
            className="form-control"
            name="paid"
            placeholder="10 000.00"
            onChange={handleChange}
            value={formData.paid}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="due" className="form-label">
          Due
          </label>
          <input
            type="text"
            className="form-control"
            name="due"
            placeholder="Due"
            onChange={handleChange}
            value={formData.due}
            
          />
        </div><div className="mb-3">
          <label htmlFor="status" className="form-label">
          Status
          </label>
          <input
            type="text"
            className="form-control"
            name="status"
            placeholder="Paid"
            onChange={handleChange}
            value={formData.status}
            
          />
        </div>
        </div>

        </div> 
              </div>
            </div>
      
       <div className="d-flex justify-content-end border-top">
              {/* <button type="submit" className="btn btn-secondary "> Cancel </button> */}
              <button type="submit" className="btn btn-success"> Submit </button>

       </div>
      </form>
  
  );
};

export default SalesForm;
