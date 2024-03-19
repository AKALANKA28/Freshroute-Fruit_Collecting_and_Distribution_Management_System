import React from "react";

const vehicleForm = ({ handleSubmit, handleOnChange, rest }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Vehicle Number
          </label>
          <input
            type="Number"
            className="form-control"
            name="vehicle_no"
            placeholder="vehicle number"
            required
            onChange={handleOnChange}
            value={rest.vehicle_no}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Vehicle Type
          </label>
          <input
            type="text"
            className="form-control"
            name="type"
            placeholder="type"
            required
            onChange={handleOnChange}
            value={rest.type}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Vehicle Conditions
          </label>
          <input
            type="text"
            className="form-control"
            name="conditions"
            placeholder="conditions"
            required
            onChange={handleOnChange}
            value={rest.conditions}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Vehicle Capasity
          </label>
          <input
            type="Number"
            className="form-control"
            name="capacity"
            placeholder="capacity"
            required
            onChange={handleOnChange}
            value={rest.capacity}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Owner Name
          </label>
          <input
            type="text"
            className="form-control"
            name="owner_name"
            placeholder="owner_name"
            required
            onChange={handleOnChange}
            value={rest.owner_name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            NIC
          </label>
          <input
            type="text"
            className="form-control"
            name="nic"
            placeholder="nic"
            required
            onChange={handleOnChange}
            value={rest.nic}
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
            placeholder="email"
            required
            onChange={handleOnChange}
            value={rest.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Phone Number 
          </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="phone"
            required
            onChange={handleOnChange}
            value={rest.phone}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Owner Account Number
          </label>
          <input
            type="Number"
            className="form-control"
            name="account_no"
            placeholder="account_no"
            required
            onChange={handleOnChange}
            value={rest.account_no}
          />
        </div>
        

        

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default vehicleForm;