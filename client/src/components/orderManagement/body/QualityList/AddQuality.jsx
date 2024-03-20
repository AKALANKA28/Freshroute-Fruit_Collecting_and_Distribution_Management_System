import React from "react";

const AddQuality = ({ handleSubmit, handleOnChange, rest }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Fruit category
          </label>
          <input
            type="text"
            className="form-control"
            name="fruit_category"
            placeholder="Fruit Category"
            required
            onChange={handleOnChange}
            value={rest.fruit_category}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Grade
          </label>
          <input
            type="text"
            className="form-control"
            name="grade"
            placeholder="Grade"
            required
            onChange={handleOnChange}
            value={rest.grade}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Quality Description
          </label>
          <input
            type="text"
            className="form-control"
            name="quality_desc"
            placeholder="Description"
            required
            onChange={handleOnChange}
            value={rest.quality_desc}
          />
        </div> 

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Storage Conditions 
          </label>
          <input
            type="text"
            className="form-control"
            name="storage_cond"
            placeholder="Storage Conditions"
            required
            onChange={handleOnChange}
            value={rest.storage_cond}
          />
        </div> 

        <button className="btn btn-secondary" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddQuality;
