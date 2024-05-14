import React, {useEffect, useState} from 'react'
import '../../../App.css'
import logo from "../../../assests/logo.png";
import {FaChevronRight} from "react-icons/fa";
import {NavLink, useLocation} from "react-router-dom";
import "../../orderProcessor/sidebar/Sidebar.css"


const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [orderActive, setOrderActive] = useState(false);

    useEffect(()=>{
        setOrderActive(orderCollapsedActive());
    },[currentPath])

    const handleToggleSideBar = () => {
        document.body.classList.toggle('toggle-sidebar');
        setOrderActive(orderCollapsedActive())
        if (!document.body.classList.contains('toggle-sidebar')) {
            setIsCollapsed(true);
        }
    }
    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        if (!document.body.classList.contains('toggle-sidebar')) {
            document.body.classList.toggle('toggle-sidebar');
            setIsCollapsed(false);
        }
    };

    const orderCollapsedActive = ()=> {
        return (!document.body.classList.contains('toggle-sidebar')
            && (currentPath.endsWith('RequestedOrderList') ||
                currentPath.endsWith('AssignedOrderList') || currentPath.endsWith('CompletedOrderList')))
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

                <ul className="sidebar-nav d-flex flex-column h-100" id='sidebar-nav'>
                    <li className='nav-item'>
                        <NavLink to='/OMDashboard' className={({isActive}) => {
                            return (isActive && currentPath.endsWith('/OMDashboard')) ? 'nav-link nav-active' : 'nav-link'
                        }}>
                            <i className='bi bi-grid-1x2'></i>
                            <span className={"nav-text"}>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink to='/OMDashboard/QualityList' className={({isActive}) => {
                            return isActive ? 'nav-link nav-active' : 'nav-link'
                        }}>
                            <i className="bi bi-sliders"></i>
                            <span>Quality Control</span>
                        </NavLink>
                    </li>


                    <li className='nav-item'>
                        <a className={`${orderActive ? 'nav-active' : ''} nav-link `} onClick={handleToggleCollapse}>
                            <i className="bi bi-box-seam"></i>
                            <span className={"hide-collapsed"}>Orders</span>
                            <i className={`${isCollapsed ? '' : 'rotate-icon'} bi bi-chevron-down`}></i>
                        </a>

                        <ul id='components-nav' className={`${isCollapsed ? ' hide-item' : 'collapsed-content'} `}>

                            <li className={'collapsed-item'}>
                                <NavLink to={'/OMDashboard/RequestedOrderList'} className={({isActive}) => {
                                    return isActive ? 'sub-nav nav-active' : 'sub-nav'
                                }}>
                                    <i className='bi bi-circle'></i>
                                    <span>Requested Orders</span>

                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/OMDashboard/AssignedOrderList'} className={({isActive}) => {
                                    return isActive ? 'sub-nav nav-active' : 'sub-nav'
                                }}>
                                    <i className='bi bi-circle'></i>
                                    <span>Assigned Orders</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/OMDashboard/CompletedOrderList'} className={({isActive}) => {
                                    return isActive ? 'sub-nav nav-active' : 'sub-nav'
                                }}>
                                    <i className='bi bi-circle'></i>
                                    <span>Completed Orders</span>
                                </NavLink>
                            </li>

                        </ul>

                    </li>
                    <li className='nav-item'>
                        <NavLink to='/OMDashboard/SupplierList' className={({isActive}) => {
                            return isActive ? 'nav-link nav-active' : 'nav-link'
                        }}>
                            <i className="bi bi-people"></i>
                            <span className={"nav-text"}>Suppliers</span>
                        </NavLink>
                    </li>

                    <li className={`${isCollapsed? '': 'mt-0-important'}  nav-item settings`}>
                        <NavLink to='/' className={({isActive}) => {
                            return isActive ? 'nav-link nav-active' : 'nav-link'
                        }}>
                            <i className="bi bi-gear"></i>
                            <span className={"nav-text"}>Settings</span>
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/' className={({isActive}) => {
                            return isActive ? 'nav-link nav-active' : 'nav-link'
                        }}>
                            <i className="bi bi-box-arrow-left"></i>
                            <span className={"nav-text"}>Logout</span>
                        </NavLink>
                    </li>

                </ul>
            </aside>
        </div>
    )
}

export default Sidebar
