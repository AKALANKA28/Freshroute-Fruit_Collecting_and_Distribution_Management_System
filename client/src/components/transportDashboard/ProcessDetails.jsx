import React from 'react'
import './body/main.css'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Process from './body/processdetails/Process'
import Footer from './footer/Footer'


const ProcessDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Process />
      <Footer />
    </div>
  )
}

export default ProcessDetails