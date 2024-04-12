// ./client/src/components/Coordinator/TransportFee.jsx
import React from "react";
import Header from "./header/header";
import Sidebar from "./sidebar/Sidebar";
import TransportFee from "./body/TransportFee/TransportFee";
import Footer from "./footer/Footer";

const Coordinator = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <TransportFee />
      <Footer />
    </div>
  );
};

export default Coordinator;
