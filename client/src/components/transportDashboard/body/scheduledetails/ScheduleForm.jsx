import React from "react";

const ScheduleForm = ({ handleSubmit, handleOnChange, rest, isEditMode }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Schedule ID
          </label>
          <input
            type="Number"
            className="form-control"
            name="schedule_ID"
            placeholder="schedule_ID"
            required
            onChange={handleOnChange}
            value={rest.schedule_ID}
            readOnly={isEditMode}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Vehicle Number
          </label>
          <input
            type="text"
            className="form-control"
            name="vehicle_no"
            placeholder="vehicle number"
            required
            onChange={handleOnChange}
            value={rest.vehicle_no}
            readOnly={isEditMode}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Driver Name
          </label>
          <input
            type="text"
            className="form-control"
            name="driver_name"
            placeholder="driver_name"
            required
            onChange={handleOnChange}
            value={rest.driver_name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Pickup Location
          </label>
          <input
            type="text"
            className="form-control"
            name="pickup_location"
            placeholder="pickup_location"
            required
            onChange={handleOnChange}
            value={rest.pickup_location}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Destination 
          </label>
          <input
            type="text"
            className="form-control"
            name="destination"
            placeholder="destination"
            required
            onChange={handleOnChange}
            value={rest.destination}
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
            placeholder="date"
            required
            onChange={handleOnChange}
            value={rest.date}
            readOnly={isEditMode}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Quantity
          </label>
          <input
            type="Number"
            className="form-control"
            name="quantity"
            placeholder="quantity"
            required
            onChange={handleOnChange}
            value={rest.quantity}
            readOnly={isEditMode}
          />
        </div>
        

        

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ScheduleForm;