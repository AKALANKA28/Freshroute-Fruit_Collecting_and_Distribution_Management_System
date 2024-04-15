import React from 'react'
import '../../../App.css'
import navList from './navItem';
import { Link } from 'react-router-dom'; // Import Link from React Router

import Logo from '../../../assests/logo.png';


const Sidebar = () => {

    
  return (
    <div>
      <aside id='sidebar' className='sidebar'>
      <a href='/tdahsboard' className='logo d-flex align-items-center'>
           <img src={Logo} alt='logo image'/>
           <span className=''>FreshRoute</span>
        </a> 
        <ul className="sidebar-nav" id='sidebar-nav'>

            <li className='nav-item'>
                <a className='nav-link ' href='/'>
                    <i className='bi bi-grid-1x2-fill'></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' href='/vehicles'>
                    <i className='bi bi-grid-1x2-fill'></i>
                    <span>Vehicles</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' href='/map'>
                    <i className='bi bi-grid-1x2-fill'></i>
                    <span>Map</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' href='/route'>
                    <i className='bi bi-grid-1x2-fill'></i>
                    <span>Route</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' href='/schedule'>
                    <i className='bi bi-grid-1x2-fill'></i>
                    <span>Schedule</span>
                </a>
            </li>



            <div className='mt-15'>
                {navList.map(nav => (
                    <li className='nav-item' key={nav._id}>
                    <a className='nav-link collapsed' href ={'/login'}>
                        <i className={nav.icon}></i>
                        <span>{nav.name}</span>
                    </a>
                </li>
                ))}
            </div>
            

        </ul>
      </aside>
    </div>
  )
}

export default Sidebar
