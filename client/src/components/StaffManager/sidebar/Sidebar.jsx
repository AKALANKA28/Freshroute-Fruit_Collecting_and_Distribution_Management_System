/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../../App.css";
import navList from "./navItem";

const Sidebar = () => {
  return (
    <div>
      <aside id="sidebar" className="sidebar">
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
