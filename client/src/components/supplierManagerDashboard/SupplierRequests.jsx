import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import SupplierRequestsBody from './body/SupplierRequests/SupplierRequestsBody'
import Footer from './footer/Footer'


const SupplierRequests = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <SupplierRequestsBody />
      <Footer />
    </div>
  )
}

export default SupplierRequests