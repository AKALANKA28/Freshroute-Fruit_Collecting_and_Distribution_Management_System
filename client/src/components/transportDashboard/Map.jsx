import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TransportLocationMap from './TransportLocationMap';
import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Footer from './footer/Footer'

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

    <div>
      <Header />
      <Sidebar />
      <div className='main'>
      <div className='card'>
      <div className="card-body p-0" style={{minHeight:"38rem"}}>
        {/* <h5 className="card-title">
          Transport Locations
        </h5> */}
        <div>
      <TransportLocationMap suppliers={suppliers} />
    </div>
      </div>
    </div>
      </div>
  
    <Footer />
    </div>
  )
}

export default Map
