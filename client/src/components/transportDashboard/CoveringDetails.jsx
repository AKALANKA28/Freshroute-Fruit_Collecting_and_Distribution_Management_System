import React from 'react'
import './body/main.css'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Covering from './body/Coveringdetails/Covering'
import Footer from './footer/Footer'


const CoveringDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Process />
      <Footer />
    </div>
  )
}

export default CoveringDetails