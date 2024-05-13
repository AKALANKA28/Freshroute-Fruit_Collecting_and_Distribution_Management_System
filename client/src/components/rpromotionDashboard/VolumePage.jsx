import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Vmain from './body/Volume/Vmain'
import Footer from './footer/Footer'



const VolumePage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Vmain />
      <Footer />
    </div>
  )
}

export default VolumePage
