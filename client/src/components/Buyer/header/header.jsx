import React from 'react'
import '../../../App.css'
import Logo from './Logo';
import Nav from './nav/Nav'

const header = () => {
  return (
    <div style={{marginTop:"3%"}}>
      <header id='header' className='header fixed-top d-flex align-items-center'>
         <Logo />
         <Nav />
        </header>
    </div>
  )
}

export default header
