import React from 'react'
import '../../../App.css'
import './sidebar.css'
import navList from './navItem';
import logo from '../../../assests/logo.png';




const Sidebar = () => {
  return (
    <div>
      <aside id='sidebar' className='sidebar driver-sidebar'>

      <a href='/' className='logo d-flex align-items-center'>
                    <img src={logo} alt='logo image' />
                    <span className=''>FreshRoute</span>
                </a>
                <hr className='hr'></hr>

            <ul className="sidebar-nav" id='sidebar-nav'>

                <li className="nav-item">
                    <a className='nav-link' href='/'>
                        <i className='bi bi-grid-1x2'></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className='nav-link collapsed' href='/'>
                        <i className="bi bi-box-arrow-left"></i>
                        <span>Logout</span>
                    </a>
                </li>
    

        </ul>
      </aside>
    </div>
  )
}

export default Sidebar
