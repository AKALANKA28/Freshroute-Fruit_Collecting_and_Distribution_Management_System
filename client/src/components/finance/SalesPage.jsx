import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Footer from './footer/Footer'
import './body/main.css'
import Sales from './body/Sales/Sales'

const SalesPage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Sales />
      <Footer />
    </div>
  )
}

export default SalesPage
