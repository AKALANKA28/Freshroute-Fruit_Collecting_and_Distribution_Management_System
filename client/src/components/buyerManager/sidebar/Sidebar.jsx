import React from 'react';
import '../../../App.css';
import navList from './navItem';
import logo from '../../../assests/logo.png';
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
                        <img src={logo} alt='logo image' />
                        <span className='d-none d-lg-block'>FreshRoute</span>
                    </a>
                    <hr className='hr'></hr>
                    <FaChevronRight className='toggle-sidebar-btn d-flex align-items-center justify-content-center' onClick={handleToggleSideBar} />
                </div>
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <a className="nav-link dashboard-button" href="/BMDashboard">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li className='nav-item'>
                        <a className='nav-link dashboard-button' href='/'>
                            <i className='bi bi-grid'></i>
                            <span>Buyer Details</span>
                        </a>
                    </li>

                    <li className='nav-item'>
                        <a className='nav-link collapsed dashboard-button' data-bs-target='#forms-nav' data-bs-toggle='collapse' href='#'>
                            <i className='bi bi-journal-text'></i>
                            <span>Order</span>
                            <i className='bi bi-chevron-down ms-auto'></i>
                        </a>

                        <ul id='forms-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>

                            <li>
                                <a className="dashboard-button" href='/RequestedOrder'>
                                    <i className='bi bi-circle'>
                                        <span>Requested Order</span>
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a className="dashboard-button" href='/NormalOrder'>
                                    <i className='bi bi-circle'>
                                        <span>Normal Order</span>
                                    </i>
                                </a>
                            </li>

                        </ul>
                    </li>

                    <div className="mt-16 ">
                        <li className='nav-item'>
                            <a className='nav-link collapsed dashboard-button' href='/login'>
                                <i className="bi bi-gear"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link collapsed dashboard-button' href='/login'>
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

export default Sidebar;
