import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import VehicleDetailsBody from './body/transportdetails/VehicleDetailsBody'
import Footer from './footer/Footer'


const VehicleDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <VehicleDetailsBody />
      <Footer />
    </div>
  )
}

export default VehicleDetails