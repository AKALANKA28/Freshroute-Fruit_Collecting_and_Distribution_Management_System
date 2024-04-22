import React from 'react'
import '../../../App.css'
import navList from './navItem';
import logo from "../../../assests/logo.png";
import {Link} from "react-router-dom";

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
                {/* <i className='bi bi-list toggle-sidebar-btn' onClick={handleToggleSideBar}></i> */}


                <ul className="sidebar-nav" id='sidebar-nav'>
                    <li className='nav-item'>
                        <a className='nav-link' href='/OMDashboard'>
                            <i className='bi bi-grid-1x2-fill'></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li className='nav-item'>
                        <a className='nav-link ' href='/OMDashboard/QualityList'>
                            <i className="bi bi-sliders"></i>

                            <span>Quality Control</span>
                        </a>
                    </li>

                    <li className='nav-item'>
                        <a className='nav-link collapsed' data-bs-target='#forms-nav' data-bs-toggle='collapse'
                           href='Orders'>
                            <i className="bi bi-box-seam"></i>
                            <span>Orders</span>
                            <i className='bi bi-chevron-down ms-auto'></i>
                        </a>

                        <ul id='forms-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>

                            <li>
                                <a href='/OMDashboard/RequestedOrderList'>
                                    <i className='bi bi-circle'>
                                        <span>Requested Orders</span>
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href='/OMDashboard/AssignedOrderList'>
                                    <i className='bi bi-circle'>
                                        <span>Assigned Orders</span>
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href='/OMDashboard/CompletedOrderList'>
                                    <i className='bi bi-circle'>
                                        <span>Completed Orders</span>
                                    </i>
                                </a>
                            </li>

                        </ul>
                    </li>

                    <li className='nav-item'>
                        <a className='nav-link ' href='/OMDashboard/SupplierList'>
                            <i className="bi bi-people"></i>

                            <span>Suppliers</span>
                        </a>
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
    )
}

export default Sidebar
