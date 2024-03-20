import React, { Component } from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './header/header'
import HeaderCard from './Body/HeaderCard'

export default class BuyerDashBoard extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Sidebar/>
        <HeaderCard/>
      </div>
    )
  }
}
