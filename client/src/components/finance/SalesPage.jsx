import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Main from './body/Sales/Main'
import Footer from './footer/Footer'
import './body/main.css'

const SalesPage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  )
}

export default SalesPage
