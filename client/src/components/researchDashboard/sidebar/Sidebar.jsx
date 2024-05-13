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
                <a className='nav-link' href='/RPDashboard'>
                    <i className='bi bi-grid'></i>
                    <span>Dashboard</span>
                </a>
            </li>
            
            <li className="nav-item">
            <a className="nav-link collapsed" href="/CompaignPage">
              <i class="bi bi-megaphone"></i>
              <span>Active Campaign</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="/PromotionPage">
              <i class="bi bi-building-check"></i>
              <span>Farmer Resources Access</span>
            </a>
          </li>


            

            {/* <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#forms-nav' data-bs-toggle='collapse' href='#'>
                    <i className='bi bi-building-add'></i>
                    <span>Promotion</span>
                    <i className='bi bi-chevron-down ms-auto'></i>
                </a>

                <ul id='forms-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
                    
                    <li>
                        <a href='/CompaignPage'>
                            <i className='bi bi-circle'>
                                <span>Active Campaigns</span>
                            </i>
                        </a>
                    </li>
                    <li>
                        <a href='/PromotionPage'>
                            <i className='bi bi-circle'>
                                <span>Farmer Resources Access</span>
                            </i>
                        </a>
                    </li>
                    
                </ul>
            </li> */}

            <li className="nav-item">
            <a className="nav-link collapsed" href="/ResourcePage">
              <i class="bi bi-menu-button-wide"></i>
              <span>Resource Allocation</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="/AccResourcePage">
              <i class="bi bi-journal-text"></i>
              <span>Resource Accessing</span>
            </a>
          </li>

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
