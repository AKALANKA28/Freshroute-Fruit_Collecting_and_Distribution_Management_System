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

            <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i class="bi bi-cash"></i>
              <span>Research</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i class="bi bi-cash"></i>
              <span>Promotion</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/PromotionPage">
              <i class="bi bi-menu-button-wide"></i>
              <span>Farmer Resource</span>
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
                {navList.map((nav) => (
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
  );
};

export default Sidebar;
