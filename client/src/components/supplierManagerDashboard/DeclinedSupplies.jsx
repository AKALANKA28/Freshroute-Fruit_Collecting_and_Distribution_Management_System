import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Footer from './footer/Footer'
import DeclinedSuppliesTable from './body/SupplyRequests/DeclinedSuppliesTable'; // Import DeclinedSuppliesTable

axios.defaults.baseURL = "http://localhost:8070/";

const DeclinedSupplies = () => {
  const [declinedSupplies, setDeclinedSupplies] = useState([]); // State to hold Declined supplies data

  useEffect(() => {
    fetchDeclinedSupplies(); // Fetch Declined supplies data when component mounts
  }, []);

  const fetchDeclinedSupplies = async () => {
    try {
      const response = await axios.get("/declinedSupply");
      setDeclinedSupplies(response.data);
    } catch (error) {
      console.error("Error fetching Declined supplies:", error);
    }
  };

  return (
    <div id="main">
      <Header />
      <Sidebar />
      <DeclinedSuppliesTable declinedSupplies={declinedSupplies} /> {/* Pass declinedSupplies as prop */}
      <Footer />
    </div>
  );
}

export default DeclinedSupplies;
