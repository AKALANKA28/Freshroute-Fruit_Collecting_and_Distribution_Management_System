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
            <a className="nav-link" href="/BuyerDashboard">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span> 
            </a>
          </li>
          <li className='nav-item'>
                <a className='nav-link' href='/'>
                    <i className='bi bi-grid'></i>
                    <span>Previous Orders</span>
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
  )
}

export default Sidebar
