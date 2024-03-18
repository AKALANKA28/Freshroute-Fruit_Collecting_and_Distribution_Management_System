import React from "react";

const FruitTypeForm = ({ handleSubmit, handleOnChange, data }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Fruit Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Fruit Name"
            onChange={handleOnChange}
            value={data?.name || ""}
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
            value={data?.date || ""}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Description"
            onChange={handleOnChange}
            value={data?.description || ""}
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

export default FruitTypeForm;
