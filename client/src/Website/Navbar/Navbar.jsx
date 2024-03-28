import React from 'react'
import "./navbar.css"

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className='nav-logo'>FreshRoute.</div>
      <ul className='nav-menu'>
        <li>Home</li>
        <li>About</li>
        <li>Shop</li>
        <li className='nav-contact'>Contact</li>
      </ul>
    </nav>
  )
}

export default Navbar
