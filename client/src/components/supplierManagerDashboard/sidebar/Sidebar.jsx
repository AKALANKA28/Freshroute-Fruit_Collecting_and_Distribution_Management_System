import React from 'react';
import '../../../App.css';

const Sidebar = () => {
  return (
    <div>
      <aside id='sidebar' className='sidebar'>
        <ul className="sidebar-nav" id='sidebar-nav'>

          <li className='nav-item'>
            <a className='nav-link' href='SMDashboard'>
              <i className='bi bi-grid'></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li className='nav-item'>
            <a className='nav-link collapsed' data-bs-target='#supplier-details-nav' data-bs-toggle='collapse' href='#'>
              <i className='bi bi-person-lines-fill'></i>
              <span>Supplier Details</span>
              <i className='bi bi-chevron-down ms-auto'></i>
            </a>

            <ul id='supplier-details-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
              <li>
                <a href='SupplierRequests'>
                  <i className='bi bi-journal-plus'></i>
                  <span>Supplier Requests</span>
                </a>
              </li>
              <li>
                <a href='SupplierDetails'>
                  <i className='bi bi-people'></i>
                  <span>Suppliers</span>
                </a>
              </li>
            </ul>
          </li>

          <li className='nav-item'>
            <a className='nav-link collapsed' data-bs-target='#supply-requests-nav' data-bs-toggle='collapse' href='#'>
              <i className='bi bi-truck'></i>
              <span>Supply Requests</span>
              <i className='bi bi-chevron-down ms-auto'></i>
            </a>

            <ul id='supply-requests-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
              <li>
                <a href='SupplyRequests'>
                  <i className='bi bi-list-check'></i>
                  <span>Manage Requests</span>
                </a>
              </li>
              <li>
                <a href='ApprovedSupplies'>
                  <i className='bi bi-check-circle'></i>
                  <span>Accepted Requests</span>
                </a>
              </li>
              <li>
                <a href='DeclinedSupplies'>
                  <i className='bi bi-x-circle'></i>
                  <span>Declined Requests</span>
                </a>
              </li>
            </ul>
          </li>

          <hr></hr>
          
          <div className='navList'>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                <i className='bi bi-box-arrow-right'></i>
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