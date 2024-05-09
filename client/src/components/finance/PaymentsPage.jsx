import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Footer from './footer/Footer'
import Payments from './body/Payments/Payments'


const PaymentsPage = () => {
  return (
    <div>
    <Header />
    <Sidebar />
    <Payments />
    <Footer />
  </div>
  )
}

export default PaymentsPage
