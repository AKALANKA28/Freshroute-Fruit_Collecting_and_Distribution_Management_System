import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import PredictionDetailsBody from './body/PredictionDetails/PredictionDetailsBody'
import Footer from './footer/Footer'


const PredictionDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <PredictionDetailsBody />
      <Footer />
    </div>
  )
}

export default PredictionDetails