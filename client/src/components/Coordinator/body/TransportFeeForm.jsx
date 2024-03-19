// ./client/src/components/Coordinator/body/TransportFeeForm.js
import React from "react";

const TransportFeeForm = ({ handleSubmit, handleOnChange, data }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="vehicletype" className="form-label">
            Vehicle Type
          </label>
          <input
            type="text"
            className="form-control"
            name="vehicletype"
            placeholder="Vehicle Type"
            onChange={handleOnChange}
            value={data.vehicletype}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="text"
            className="form-control"
            name="date"
            placeholder="Date"
            onChange={handleOnChange}
            value={data.date}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maxweight" className="form-label">
            MaxWeight(kg)
          </label>
          <input
            type="number"
            className="form-control"
            name="maxweight"
            placeholder="MaxWeight(kg)"
            onChange={handleOnChange}
            value={data.maxweight}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pricepkm" className="form-label">
            Price per km(Rs)
          </label>
          <input
            type="number"
            className="form-control"
            name="pricepkm"
            placeholder="  Price per km(Rs)"
            onChange={handleOnChange}
            value={data.pricepkm}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransportFeeForm;
