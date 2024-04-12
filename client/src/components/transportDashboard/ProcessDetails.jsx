import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import ProcessDetailsBody from './body/processdetails/ProcessDetailsBody'
import Footer from './footer/Footer'


const ScheduleDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <ProcessDetailsBody />
      <Footer />
    </div>
  )
}

export default ProcessDetails