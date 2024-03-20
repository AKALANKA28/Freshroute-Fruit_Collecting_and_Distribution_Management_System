import React from "react";

const PredictionForm = ({ handleSubmit, handleOnChange, rest }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
              Fruit Type
          </label>
          <input
            type="text"
            className="form-control"
            name="fruitType"
            placeholder="Fruit Type"
            required
            onChange={handleOnChange}
            value={rest.fruitType}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
          Quality
          </label>
          <input
            type="text"
            className="form-control"
            name="quality"
            placeholder="Quality"
            required
            onChange={handleOnChange}
            value={rest.quality}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
          Quantity
          </label>
          <input
            type="text"
            className="form-control"
            name="quantity"
            placeholder="Quantity"
            required
            onChange={handleOnChange}
            value={rest.quantity}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            name="price"
            placeholder="Price"
            required
            onChange={handleOnChange}
            value={rest.price}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Date Can Be Given
          </label>
          <input
            type="Date"
            className="form-control"
            name="dateCanBeGiven"
            placeholder="Date Can Be Given"
            required
            onChange={handleOnChange}
            value={rest.dateCanBeGiven}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PredictionForm;