import React, { Component } from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './header/header'
import HeaderCard from './Body/HeaderCard'
import PageTitle from './Body/PageTitle'

export default class BuyerDashBoard extends Component {
  render() {
    return (
      <div>
        <main  className='main'>
        <Header/>
     <PageTitle page="Dashboard" />
     
   
    </main>
    
    <Sidebar/>
        <HeaderCard/>
       
        
      </div>
    )
  }
}
