import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import SupplierLocationMap from './body/LocationsMap/SupplierLocationMap'
import Footer from './footer/Footer'

axios.defaults.baseURL = "http://localhost:8070/";

const SupplierLocations = () => {

    const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/Farmer/');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);
  return (
    <div>
      <Header />
      <Sidebar />
      <div className=' main card'>
      <div className="card-body">
        <h5 className="card-title">
          Supplier Locations
        </h5>
        <div>
      <SupplierLocationMap suppliers={suppliers} />
    </div>
      </div>
    </div>
      <Footer />
    </div>
  )
}

export default SupplierLocations