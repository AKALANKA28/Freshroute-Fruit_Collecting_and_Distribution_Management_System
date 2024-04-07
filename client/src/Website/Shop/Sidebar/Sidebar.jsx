import React from 'react'

import Category from "./Category/Category";
// import Price from "./Price/Price";
// import Colors from "./Colors/Colors";
import "./sidebar.css";

const Sidebar = ({ handleChange }) => {
  console.log(handleChange)

  return (
    <>
      <section className="sidebar shop-sidebar">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>
        <Category handleChange={handleChange} />
        {/* <Price handleChange={handleChange} /> */}
        {/* <Colors handleChange={handleChange} /> */}
      </section>
    </>
  );
};

export default Sidebar;