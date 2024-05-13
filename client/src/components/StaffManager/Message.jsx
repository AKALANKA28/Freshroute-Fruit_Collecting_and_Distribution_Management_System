import React from "react";

import Header from "./header/header";
import Sidebar from "./sidebar/Sidebar";
import Message from "./body/Message/Message";
import Footer from "./footer/Footer";

const StaffManager = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Message />
      <Footer />
    </div>
  );
};

export default StaffManager;
