import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Body from './body/Sales/Body'
import Footer from './footer/Footer'
import './body/main.css'

const SalesPage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Body />
      <Footer />
    </div>
  )
}

export default SalesPage
