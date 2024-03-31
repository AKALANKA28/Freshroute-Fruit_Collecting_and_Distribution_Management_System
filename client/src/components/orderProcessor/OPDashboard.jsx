import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Footer from './footer/Footer'
import { Outlet } from 'react-router-dom'



const OPDashboard = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default OPDashboard
