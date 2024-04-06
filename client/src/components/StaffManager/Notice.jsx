import React from "react";

import Header from "./header/header";
import Sidebar from "./sidebar/Sidebar";
import Notice from "./body/Notice/Notice";
import Footer from "./footer/Footer";

const StaffManager = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Notice />
      <Footer />
    </div>
  );
};

export default StaffManager;
