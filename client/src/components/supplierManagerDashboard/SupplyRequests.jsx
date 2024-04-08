import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import SupplyRequestsBody from './body/SupplyRequests/SupplyRequestsBody'
import Footer from './footer/Footer'


const SupplyRequests = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <SupplyRequestsBody />
      <Footer />
    </div>
  )
}

export default SupplyRequests