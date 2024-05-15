import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TransportLocationMap from './TransportLocationMap';

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
        <h5 className="card-title">
          Transport Locations
        </h5>
        <div>
      <TransportLocationMap suppliers={suppliers} />
    </div>
      </div>
    </div>
  )
}

export default Map
