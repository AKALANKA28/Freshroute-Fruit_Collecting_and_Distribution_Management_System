import React from 'react';
import '../../../App.css';
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
            <a className='nav-link' href='SMDashboard'>
              <i className='bi bi-grid'></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li className='nav-item'>
            <a className='nav-link collapsed' data-bs-target='#supplier-details-nav' data-bs-toggle='collapse' href='#'>
              <i className='bi bi-person-lines-fill' onClick={handleToggleSideBar}></i>
              <span>Supplier Details</span>
              <i className='bi bi-chevron-down ms-auto'></i>
            </a>

            <ul id='supplier-details-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
              <li>
                <a href='SupplierRequests'>
                  <i className='bi bi-journal-plus' style={{ marginRight: "-30px" }}></i>
                  <span>Supplier Requests</span>
                </a>
              </li>
              <li>
                <a href='SupplierDetails'>
                  <i className='bi bi-people' style={{ marginRight: "-30px" }}></i>
                  <span>Suppliers</span>
                </a>
              </li>
            </ul>
          </li>

          <li className='nav-item'>
            <a className='nav-link collapsed' data-bs-target='#supply-requests-nav' data-bs-toggle='collapse' href='#'>
              <i className='bi bi-basket2-fill' onClick={handleToggleSideBar}></i>
              <span>Supply Requests</span>
              <i className='bi bi-chevron-down ms-auto'></i>
            </a>

            <ul id='supply-requests-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
              <li>
                <a href='SupplyRequests'>
                  <i className='bi bi-list-check' style={{ marginRight: "-30px" }}></i>
                  <span>Manage Requests</span>
                </a>
              </li>
              <li>
                <a href='ApprovedSupplies'>
                  <i className='bi bi-check-circle' style={{ marginRight: "-30px" }}></i>
                  <span>Accepted Requests</span>
                </a>
              </li>
              <li>
                <a href='DeclinedSupplies'>
                  <i className='bi bi-x-circle' style={{ marginRight: "-30px" }}></i>
                  <span>Declined Requests</span>
                </a>
              </li>
            </ul>
          </li>

          <li className='nav-item'>
            <a className='nav-link collapsed' href='SupplierLocations'>
              <i className='bi bi-geo-alt'></i>
              <span>Supplier Locations</span>
            </a>
          </li>

          <hr></hr>
          
          <div className="mt-16 ">
            <li className='nav-item'>
                <a className='nav-link collapsed' href='/'>
                    <i class="bi bi-gear"></i>
                    <span>Settings</span>
                </a>
            </li> <li className='nav-item'>
                <a className='nav-link collapsed' href='/'>
                    <i class="bi bi-box-arrow-left"></i>
                    <span>Logout</span>
                </a>
            </li>
            </div>

        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;