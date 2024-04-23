import React from 'react'
import '../../../App.css'
import navList from './navItem';
import logo from '../../../assests/logo.png'

const Sidebar = () => {

  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar');
  }

  return (
    <div>
      <aside id="sidebar" className="sidebar">
      <div className='d-flex align-items-center justify-content-between'>
        <a href='/' className='logo d-flex align-items-center'>
        < img src={logo} alt='logo image'/>
           <span className='d-none d-lg-block'>FreshRoute</span>
        </a>
       <i className='bi bi-list toggle-sidebar-btn' onClick={handleToggleSideBar}></i>
       </div>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/StaffManager">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/Employee">
              <i class="bi bi-people"></i>
              <span>Employees</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/CalculateSalary">
              <i class="bi bi-people"></i>
              <span>Salaries</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/Notice">
              <i class="bi bi-card-heading"></i>
              <span>Notices</span>
            </a>
          </li>

          <li className="nav-heading">Pages</li>
          <div className="navList">
            {navList.map((nav) => (
              <li className="nav-item" key={nav._id}>
                <a className="nav-link collapsed" href={"/login"}>
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
