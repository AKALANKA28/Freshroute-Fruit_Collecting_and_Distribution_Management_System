import React from "react";

const CategoryPriceForm = ({ handleSubmit, handleOnChange, data }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            Weight(kg)
          </label>
          <input
            type="number"
            className="form-control"
            name="weight"
            placeholder="Weight"
            onChange={handleOnChange}
            value={data.weight}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quality" className="form-label">
          Quality
          </label>
          <input
            type="text"
            className="form-control"
            name="quality"
            placeholder="Quality"
            onChange={handleOnChange}
            value={data.quality}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Price"
            onChange={handleOnChange}
            value={data.price}
            
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default CategoryPriceForm;
