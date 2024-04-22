import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SupplierLocationMap from './SupplierLocationMap';

axios.defaults.baseURL = "http://localhost:8070/";

const Map = () => {

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch supplier data from the backend
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/Farmer/'); // Update the endpoint
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  
  return (
    <div className='card'>
      <div className="card-body">
        <h5 className="card-title">
          Supplier Locations
        </h5>
        <div>
      <SupplierLocationMap suppliers={suppliers} />
    </div>
      </div>
    </div>
  )
}

export default Map
