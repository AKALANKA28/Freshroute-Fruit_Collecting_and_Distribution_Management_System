import React from 'react';
import '../../../App.css';
import navList from './navItem';

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
              <i className='bi bi-menu-button-wide'></i>
              <span>Supplier Details</span>
              <i className='bi bi-chevron-down ms-auto'></i>
            </a>

            <ul id='supplier-details-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>

              <li>
                <a href='SupplierDetails'>
                  <i className='bi bi-circle'>
                    <span>Suppliers</span>
                  </i>
                </a>
              </li>
              <li>
                <a href='SupplierRequests'>
                  <i className='bi bi-circle'>
                    <span>Supplier Requests</span>
                  </i>
                </a>
              </li>
            </ul>
          </li>

          <li className='nav-item'>
            <a className='nav-link collapsed' data-bs-target='#supply-requests-nav' data-bs-toggle='collapse' href='#'>
              <i className='bi bi-menu-button-wide'></i>
              <span>Supply Requests</span>
              <i className='bi bi-chevron-down ms-auto'></i>
            </a>

            <ul id='supply-requests-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>

              <li>
                <a href='SupplyRequests'>
                  <i className='bi bi-circle'>
                    <span>Manage Supply Requests</span>
                  </i>
                </a>
              </li>
              <li>
                <a href='ApprovedSupplies'>
                  <i className='bi bi-circle'>
                    <span>Accepted Requests</span>
                  </i>
                </a>
              </li>
              <li>
                <a href='DeclinedSupplies'>
                  <i className='bi bi-circle'>
                    <span>Declined Requests</span>
                  </i>
                </a>
              </li>
            </ul>
          </li>

          <li className='nav-item'>
            <a className='nav-link collapsed' data-bs-target='#documents-nav' data-bs-toggle='collapse' href='#'>
              <i className='bi bi-layout-text-window-reverse'></i>
              <span>Documents</span>
              <i className='bi bi-chevron-down ms-auto'></i>
            </a>

            <ul id='documents-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>

              <li>
                <a href='#'>
                  <i className='bi bi-circle'>
                    <span>General Tables</span>
                  </i>
                </a>
              </li>
              <li>
                <a href='#'>
                  <i className='bi bi-circle'>
                    <span>Data Tables</span>
                  </i>
                </a>
              </li>


            </ul>
          </li>

          <li className='nav-heading'>Pages</li>
          <div className='navList'>
            {navList.map(nav => (
              <li className='nav-item' key={nav._id}>
                <a className='nav-link collapsed' href={'/login'}>
                  <i className={nav.icon}></i>
                  <span>{nav.name}</span>
                </a>
              </li>
            ))}
          </div>


        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
