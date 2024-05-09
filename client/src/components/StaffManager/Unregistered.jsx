import React from "react";

import Header from "./header/header";
import Sidebar from "./sidebar/Sidebar";
import Unregistered from "./body/Unregistered/Unregistered";
import Footer from "./footer/Footer";

const StaffManager = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Unregistered />
      <Footer />
    </div>
  );
};

export default StaffManager;
