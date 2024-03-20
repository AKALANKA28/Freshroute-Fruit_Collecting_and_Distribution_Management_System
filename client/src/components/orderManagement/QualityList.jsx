import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Footer from './footer/Footer'
import QualityListBody from './body/QualityList/QualityListBody'




const QualityList = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <QualityListBody />
      <Footer />
    </div>
  )
}

export default QualityList
