import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import SupplierDetailsBody from './body/SupplierDetails/SupplierDetailsBody'
import Footer from './footer/Footer'


const SupplierDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <SupplierDetailsBody />
      <Footer />
    </div>
  )
}

export default SupplierDetails