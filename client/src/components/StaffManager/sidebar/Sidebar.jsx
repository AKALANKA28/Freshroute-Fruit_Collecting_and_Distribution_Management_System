import React from 'react'
import '../../../App.css'
import navList from './navItem';
import logo from '../../../assests/logo.png'
import { FaChevronRight } from "react-icons/fa";

const Sidebar = () => {

  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar');
  }

  return (
    <div>
      <aside id="sidebar" className="sidebar">
      <div className='d-flex align-items-center justify-content-between'>
        <a href='/' className='logo d-flex align-items-center'>
        < img src={logo} alt='logo image'/>
           <span className='d-none d-lg-block'>FreshRoute</span>
        </a>
        <hr className='hr'></hr>        
        <FaChevronRight className='toggle-sidebar-btn d-flex align-items-center justify-content-center' onClick={handleToggleSideBar} />
       </div>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/StaffManager">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i class="bi bi-people"></i>
              <span>Employees</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>

            <ul
              id="components-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >

              <li>
                <a href="/Unregistered">
                  <i className="bi bi-circle">
                    <span>Unregistered</span>
                  </i>
                </a>
              </li>
              <li>
                <a href="/Employee">
                  <i className="bi bi-circle">
                    <span>Registered</span>
                  </i>
                </a>
              </li>
              
            </ul>
          </li>

         

          <li className="nav-item">
            <a className="nav-link collapsed" href="/CalculateSalary">
              <i class="bi bi-cash-stack"></i>
              <span>Salaries</span>
            </a>
          </li>


          <li className="nav-item">
            <a className="nav-link collapsed" href="/Notice">
              <i class="bi bi-bell"></i>
              <span>Notices</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/Message">
              <i class="bi bi-chat-left-text"></i>
              <span>Messages</span>
            </a>
          </li>

          


         

          <div className="mt-16 ">
            <li className='nav-item'>
                <a className='nav-link collapsed' href='/login'>
                    <i class="bi bi-gear"></i>
                    <span>Settings</span>
                </a>
            </li> <li className='nav-item'>
                <a className='nav-link collapsed' href='/login'>
                    <i class="bi bi-box-arrow-left"></i>
                    <span>Logout</span>
                </a>
            </li>
            </div>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
