import React from 'react'
import './sidebar.css'
import navList from './navItem';




const Sidebar = () => {
  return (
    <div>
      <aside id='sidebar' className='sidebar'>

        <ul className="sidebar-nav" id='sidebar-nav'>

            <li className='nav-item'>
                <a className='nav-link' href='/BMDashboard'>
                    <i className='bi bi-grid'></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link' href='/'>
                    <i className='bi bi-grid'></i>
                    <span>Buyer Details</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#forms-nav' data-bs-toggle='collapse' href='#'>
                    <i className='bi bi-journal-text'></i>
                    <span>Order</span>
                    <i className='bi bi-chevron-down ms-auto'></i>
                </a>

                <ul id='forms-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
                    
                    <li>
                        <a href='/RequestedOrder'>
                            <i className='bi bi-circle'>
                                <span>Requested Order</span>
                            </i>
                        </a>
                    </li>
                    <li>
                        <a href='/NormalOrder'>
                            <i className='bi bi-circle'>
                                <span>Normal Order</span>
                            </i>
                        </a>
                    </li>

                </ul>
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
