import React from 'react'
import '../../../App.css'
import navList from './navItem';

const Sidebar = () => {
  return (
    <div>
      <aside id='sidebar' className='sidebar'>
        <ul className="sidebar-nav" id='sidebar-nav'>

            <li className='nav-item'>
                <a className='nav-link' href='/RPDashboard'>
                    <i className='bi bi-grid'></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#components-nav' data-bs-toggle='collapse' href='#'>
                    <i className='bi bi-cash'></i>
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
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#forms-nav' data-bs-toggle='collapse' href='#'>
                    <i className='bi bi-cash'></i>
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
            </li>

            <li className="nav-item">
            <a className="nav-link collapsed" href="/ResourcePage">
              <i class="bi bi-menu-button-wide"></i>
              <span>Resource Allocation</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i class="bi bi-journal-text"></i>
              <span>Resource Accessing</span>
            </a>
          </li>

            <li className='nav-heading'>Pages</li>
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
