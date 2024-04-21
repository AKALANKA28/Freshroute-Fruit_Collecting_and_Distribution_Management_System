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
                <a className='nav-link' href='/'>
                    <i className='bi bi-grid-1x2'></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li className='nav-item'>
                <Link  to='/SalesPage' className='nav-link collapsed' >
                <i class="bi bi-bar-chart"></i>
                                    <span>Sales</span>
                    {/* <i className='bi bi-chevron-down ms-auto'></i> */}
                </Link>

                <ul id='components-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>

                    <li>
                        <Link to='/SalesPage'>
                            <i className='bi bi-circle'>
                                <span>Invoices</span>
                            </i>
                        </Link>
                    </li>
                    <li>
                        <a href='#'>
                            <i className='bi bi-circle'>
                                <span>Tax Reports</span>
                            </i>
                        </a>
                    </li>
                    {/* <li>
                        <a href='#'>
                            <i className='bi bi-circle'>
                                <span>Customers</span>
                            </i>
                        </a>
                    </li> */}

                </ul>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#forms-nav' data-bs-toggle='collapse' href='/ExpensePage'>
                    <i className='bi bi-wallet'></i>
                    <span>Expenses</span>
                    <i className='bi bi-chevron-down ms-auto'></i>
                </a>

                <ul id='forms-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
                    
                    <li>
                        <a href='/ExpensePage'>
                            <i className='bi bi-circle'>
                                <span>Expenses </span>
                            </i>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <i className='bi bi-circle'>
                                <span>Expense Approvals</span>
                            </i>
                        </a>
                    </li>
                    {/* <li>
                        <a href='#'>
                            <i className='bi bi-circle'>
                                <span>Cancellation Form</span>
                            </i>
                        </a>
                    </li> */}

                </ul>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#tables-nav' data-bs-toggle='collapse' href='/salespage'>
                    <i className='bi bi-archive'></i>
                    <span>Reports</span>
                </a>

               
            </li>

            {/* <li className='nav-heading'>Pages</li>
            <div className='navList'>
                {navList.map(nav => (
                    <li className='nav-item' key={nav._id}>
                    <a className='nav-link collapsed' href ={''}>
                        <i className={nav.icon}></i>
                        <span>{nav.name}</span>
                    </a>
                </li>
                ))}
            </div> */}
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
  )
}

export default Sidebar
