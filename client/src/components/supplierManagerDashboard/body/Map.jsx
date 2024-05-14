import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SupplierLocationMap from './SupplierLocationMap';

axios.defaults.baseURL = "http://localhost:8070/";

const Map = () => {

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
    <div className='card'>
      <div className="card-body">
      <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">
            Supplier Locations
          </h5>
          <a href='/SupplierLocations'>
            <i className='bi bi-arrows-fullscreen'></i>
          </a>
        </div>
        <div>
          <SupplierLocationMap suppliers={suppliers} />
        </div>
      </div>
    </div>
  )
}

export default Map
