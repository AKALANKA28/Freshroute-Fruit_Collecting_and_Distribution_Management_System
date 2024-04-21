import React from 'react'
import '../../../App.css'
import navList from './navItem';
import logo from "../../../assests/logo.png";

const Sidebar = ()=> {
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
                        <a className='nav-link collapsed' data-bs-target='#components-nav' data-bs-toggle='collapse'
                           href='#'>
                            <i className='bi bi-menu-button-wide'></i>
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
                        <a className='nav-link' href='/OPDashboard/Supplierlist'>
                        <i class="bi bi-list-stars"></i>
                            <span>Suppliers</span>
                        </a>
                    </li>
                    
                    <li className='nav-item'>
                        <a className='nav-link' href='/OPDashboard/QualityList'>
                        <i class="bi bi-list-stars"></i>
                            <span>Quality List</span>
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
    );
}
export default Sidebar
