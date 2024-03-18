import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Main from './body/Main'
import Footer from './footer/Footer'



const MainPage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  )
}

export default MainPage
