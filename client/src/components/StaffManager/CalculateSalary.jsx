// ./client/src/components/StaffManger/CalculateSalary.jsx
import React from "react";

import Header from "./header/header";
import Sidebar from "./sidebar/Sidebar";
import CalculateSalary from "./body/CalculateSalary/CalculateSalary";
import Footer from "./footer/Footer";

const StaffManager = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <CalculateSalary />
      <Footer />
    </div>
  );
};

export default StaffManager;
