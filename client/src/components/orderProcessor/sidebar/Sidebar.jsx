import React from 'react'
import '../../../App.css'
import navList from './navItem';
import logo from "../../../assests/logo.png";
import {FaChevronRight} from "react-icons/fa";



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
                        <a className='nav-link' href='/OPDashboard'>
                            <i className='bi bi-grid-1x2'></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li className='nav-item'>
                        <a className='nav-link collapsed' data-bs-target='#components-nav' data-bs-toggle='collapse'
                           href='#'>
                            <i className="bi bi-box-seam"></i>
                            <span>Orders</span>
                            <i className='bi bi-chevron-down ms-auto'></i>
                        </a>

                        <ul id='components-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>

                            <li>
                                <a href='/OPDashboard/AssignedOrders'>
                                    <i className='bi bi-circle'>
                                        <span>Assigned Orders</span>
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href='/OPDashboard/OngoingOrders'>
                                    <i className='bi bi-circle'>
                                        <span>Ongoing Orders</span>
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href='/OPDashboard/CompletedOrders'>
                                    <i className='bi bi-circle'>
                                        <span>Completed Orders</span>
                                    </i>
                                </a>
                            </li>

                        </ul>

                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/OPDashboard/SupplierList'>
                            <i className="bi bi-people"></i>
                            <span>Suppliers</span>
                        </a>
                    </li>

                    <li className='nav-item'>
                        <a className='nav-link' href='/OPDashboard/QualityList'>
                            <i className="bi bi-list-stars"></i>
                            <span>Quality List</span>
                        </a>
                    </li>
                    <div className="mt-16 ">
                        <li className='nav-item'>
                            <a className='nav-link collapsed' href='/'>
                                <i className="bi bi-gear"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link collapsed' href='/'>
                                <i className="bi bi-box-arrow-left"></i>
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
