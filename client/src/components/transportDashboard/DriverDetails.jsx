import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Footer from './footer/Footer'
import Drivers from './body/driverDetails/Drivers'


const DriverDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Drivers />
      <Footer />
    </div>
  )
}

export default DriverDetails