import React from "react";
import avatar from "../../../../assests/staffManager.jpg";

function NavAvatar() {
  return (
    <div>
      <li className="nav-item dropdown pe-3">
        <a
          className="nav-link nav-profile d-flex align-items-center pe-8"
          href="#"
          data-bs-toggle="dropdown"
        >
          <img src={avatar} alt="profile" className="rounded-circle" />
          <span className="d-none d-md-block dropdown-toggle ps-2">
            Abeysinghe E.A
          </span>
        </a>

        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
          <li className="dropdown-header">
            <h6>Esandi</h6>
            <span>Staff Manager</span>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <i className="bi bi-person">
                <span>My Profile</span>
              </i>
            </a>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <i className="bi bi-gear">
                <span>Account Settings</span>
              </i>
            </a>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <i className="bi bi-box-arrow-right">
                <span>Log out</span>
              </i>
            </a>
          </li>
        </ul>
      </li>
    </div>
  );
}

export default NavAvatar;
