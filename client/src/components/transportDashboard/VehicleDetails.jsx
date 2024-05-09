import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Vehicle from './body/transportdetails/Vehicle'
import Footer from './footer/Footer'


const VehicleDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Vehicle/>
      <Footer />
    </div>
  )
}

export default VehicleDetails