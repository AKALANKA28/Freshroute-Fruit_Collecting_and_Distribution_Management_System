import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Footer from './footer/Footer'
import Approvals from './body/Approvals/Approvals'


const ApprovalPage = () => {
  return (
    <div>
    <Header />
    <Sidebar />
    <Approvals />
    <Footer />
  </div>
  )
}

export default ApprovalPage
