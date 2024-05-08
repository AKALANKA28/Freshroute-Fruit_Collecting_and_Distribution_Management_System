import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Schedule from './body/scheduledetails/Schedule'
import Footer from './footer/Footer'


const ScheduleDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Schedule />
      <Footer />
    </div>
  )
}

export default ScheduleDetails