import React from 'react'
import '../../../App.css'
import navList from './navItem';
import { Link } from 'react-router-dom';
import logo from '../../../assests/logo.png'
import { FaChevronRight } from "react-icons/fa";


const Sidebar = () => {

    const handleToggleSideBar = () => {
        document.body.classList.toggle('toggle-sidebar');
      }

  return (
    <div>
      <aside id='sidebar' className='sidebar'>
        <a href='/' className='logo d-flex align-items-center'>
           <img src={logo} alt='logo image'/>
           <span className=''>FreshRoute</span>
        </a>
        <hr className='hr'></hr>        
        <FaChevronRight className='toggle-sidebar-btn d-flex align-items-center justify-content-center' onClick={handleToggleSideBar} />

        <ul className="sidebar-nav" id='sidebar-nav'>

            <li className='nav-item'>
                <a className='nav-link ' href='/tdashboard'>
                    <i className='bi bi-grid'></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' href='/VehicleDetails'>
                    <i className='bi bi-truck'></i>
                    <span>Vehicle Details</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' href='/map'>
                    <i className='bi bi-geo-alt'></i>
                    <span>Map</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' href='/ProcessDetails'>
                    <i className='bi bi-compass'></i>
                    <span>Process Details</span>
                </a>
            </li>


            <li className='nav-item'>
                <a className='nav-link collapsed' href='/ScheduleDetails'>
                    <i className='bi bi-journal-medical'></i>
                    <span>Schedule Details</span>
                </a>
            </li>
            <li className='nav-item'>
                <a className='nav-link collapsed' href='/CoveringDetails'>
                    <i className='bi bi-c-circle-fill'></i>
                    <span>Coverings</span>
                </a>
            </li>


            <li className='nav-item'>
                <a className='nav-link collapsed' href='/DriverDetails'>
                <i class="bi bi-person-vcard"></i>                    <span>Driver Details</span>
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
