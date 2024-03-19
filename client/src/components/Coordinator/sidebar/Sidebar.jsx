import React from "react";
import "./sidebar.css";
import navList from "./navItem";

const Sidebar = () => {
  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/Coordinator">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i class="bi bi-bucket"></i>
              <span>Fruit</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>

            <ul
              id="components-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="/FruitType">
                  <i className="bi bi-circle">
                    <span>Type</span>
                  </i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-circle">
                    <span>Category</span>
                  </i>
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/Salary">
              <i class="bi bi-cash"></i>
              <span>Salary</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/TransportFee">
              <i class="bi bi-truck"></i>
              <span>TransportFee</span>
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
