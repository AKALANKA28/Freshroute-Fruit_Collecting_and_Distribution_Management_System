import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Footer from './footer/Footer'
import ApprovedSuppliesTable from './body/SupplyRequests/ApprovedSuppliesTable'; // Import ApprovedSuppliesTable

axios.defaults.baseURL = "http://localhost:8070/";

const ApprovedSupplies = () => {
  const [approvedSupplies, setApprovedSupplies] = useState([]); // State to hold approved supplies data

  useEffect(() => {
    fetchApprovedSupplies(); // Fetch approved supplies data when component mounts
  }, []);

  const fetchApprovedSupplies = async () => {
    try {
      const response = await axios.get("/acceptedSupply");
      setApprovedSupplies(response.data);
    } catch (error) {
      console.error("Error fetching approved supplies:", error);
    }
  };

  return (
    <div id="main">
       <Header />
       <Sidebar />
       <ApprovedSuppliesTable approvedSupplies={approvedSupplies} /> {/* Pass approvedSupplies as prop */}
       <Footer />
    </div>
  );
}

export default ApprovedSupplies;