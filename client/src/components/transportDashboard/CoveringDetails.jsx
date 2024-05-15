import React, { useEffect, useState } from 'react';
import './body/main.css';

import Header from './header/header';
import Sidebar from './sidebar/Sidebar';
import Covering from './body/Coveringdetails/Covering';
import Footer from './footer/Footer';
// import CoveringForm from './body/Coveringdetails/CoveringForm';
// import VehicleForm from './body/transportdetails/VehicleForm'; // Adjust the import path based on your project structure

const CoveringDetails = () => {
  // const [vehicles, setVehicles] = useState([]);

  // useEffect(() => {
  //   // Fetch vehicle details
  //   fetchVehicleDetails();
  // }, []);

  // const fetchVehicleDetails = async () => {
  //   try {
  //     const data = await VehicleForm.fetchVehicleDetails();
  //     setVehicles(data);
  //   } catch (error) {
  //     console.error('Error fetching vehicle details:', error);
  //   }
  // };

  return (
    <div>
      <Header />
      <Sidebar />
      <Covering />
      <Footer />
      {/* <CoveringForm vehicles={vehicles} /> Pass vehicles as props */}
    </div>
  );
};

export default CoveringDetails;
