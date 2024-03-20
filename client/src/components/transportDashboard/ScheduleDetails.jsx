import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import ScheduleDetailsBody from './body/scheduledetails/ScheduleDetailsBody'
import Footer from './footer/Footer'


const ScheduleDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <ScheduleDetailsBody />
      <Footer />
    </div>
  )
}

export default ScheduleDetails