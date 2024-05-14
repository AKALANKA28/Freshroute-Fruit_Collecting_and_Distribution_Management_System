import React from 'react'

import NavMessage from './NavMessage'
import NavAvatar from './NavAvatar'
import NavNotification from './NavNotification'
import SearchBar from './SearchBar'


const nav = () => {
  return (
    <div>
    <nav className='header-nav ms-auto'>
      <ul className='d-flex align-items-center'>
        <SearchBar />
        <NavNotification />
        <NavMessage />
        <NavAvatar />
  
      </ul>
    </nav>
  </div>
  )
}

export default nav
