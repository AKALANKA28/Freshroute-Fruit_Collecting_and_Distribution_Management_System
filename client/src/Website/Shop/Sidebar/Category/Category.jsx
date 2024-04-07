import React from 'react'
import "./category.css";

import Input from "../../Components/Input";

const Category = ({handleChange, category}) => {
  return (
    <div>
    <h2 className="sidebar-title">Category</h2>

    <div>
      <label className="sidebar-label-container">
        <Input onChange={handleChange} type="radio" value="" name="test" />
        <span className="checkmark"></span>All
      </label>
      <Input
        handleChange={handleChange}
        value={category}
        title={category}
        name="test"
      />
      {/* <Input
        handleChange={handleChange}
        value="flats"
        title="Flats"
        name="test"
      />
      <Input
        handleChange={handleChange}
        value="sandals"
        title="Sandals"
        name="test"
      />
      <Input
        handleChange={handleChange}
        value="heels"
        title="Heels"
        name="test"
      /> */}
    </div>
  </div>
  )
}

export default Category
