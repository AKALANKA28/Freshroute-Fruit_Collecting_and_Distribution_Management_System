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

     {/* <i className='bi bi-chevron-right toggle-sidebar-btn d-flex align-items-center justify-content-center' onClick={handleToggleSideBar}></i> */}


        <ul className="sidebar-nav" id='sidebar-nav'>

            <li className='nav-item'>
                <a className='nav-link' href='/PDashboard'>
                    <i className='bi bi-grid'></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <li className="nav-item">
            <a className="nav-link collapsed" href="/RevenuePage">
              <i class="bi bi-graph-up-arrow"></i>
              <span>Revenue</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/VolumePage">
              <i class="bi bi-clipboard-pulse"></i>
              <span>Volume</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/PricePage">
              <i class="bi bi-bar-chart"></i>
              <span>Price</span>
            </a>
          </li>

            {/* <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#components-nav' data-bs-toggle='collapse' href='#'>
                    <i className='bi bi-bar-chart-line'></i>
                    <span>Research</span>
                    <i className='bi bi-chevron-down ms-auto'></i>
                </a>

                <ul id='components-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>

                    <li>
                        <a href='/RevenuePage'>
                            <i className='bi bi-circle'>
                                <span>Revenue</span>
                            </i>
                        </a>
                    </li>
                    <li>
                        <a href='VolumePage'>
                            <i className='bi bi-circle'>
                                <span>Volume</span>
                            </i>
                        </a>
                    </li>
                    <li>
                        <a href='/PricePage'>
                            <i className='bi bi-circle'>
                                <span>Price</span>
                            </i>
                        </a>
                    </li>

                </ul>
            </li> */}

            

            {/* <li className='nav-heading'>Pages</li> */}
            <div className='navList'>
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
