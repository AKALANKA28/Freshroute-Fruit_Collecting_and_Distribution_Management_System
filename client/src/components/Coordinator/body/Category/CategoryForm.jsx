import React from "react";

const CategoryForm = ({ handleSubmit, handleOnChange, data }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fruit" className="form-label">
            Fruit
          </label>
          <input
            type="text"
            className="form-control"
            name="fruit"
            placeholder="Fruit"
            onChange={handleOnChange}
            value={data.fruit}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Category"
            onChange={handleOnChange}
            value={data.category}
            required
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
            onChange={handleOnChange}
            value={data.date}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default CategoryForm;
