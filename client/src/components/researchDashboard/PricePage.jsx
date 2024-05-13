import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Pmain from './body/Price/Pmain'
import Footer from './footer/Footer'



const PricePage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Pmain />
      <Footer />
    </div>
  )
}

export default PricePage
