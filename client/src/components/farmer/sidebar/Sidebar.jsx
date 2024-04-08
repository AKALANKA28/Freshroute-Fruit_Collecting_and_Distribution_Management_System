import React, { useState } from "react";
import axios from "axios";
import './sidebar.css'
import navList from './navItem';
import { Modal, Button } from 'react-bootstrap';
import PredictionForm from '../body/PredictionDetails/PredictionForm'


const Sidebar = () => {

    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleAddModalOpen = () => {
      setAddModalOpen(true);
    };
  
    const handleAddModalClose = () => {
      setAddModalOpen(false);
    };
  
    const handleSubmit = async (formData) => {
      try {
        await axios.post("/Prediction/add", formData);
        alert("Prediction Added");
        handleAddModalClose();
        window.location.reload();
      } catch (err) {
        alert(err.message);
      }
    };

  return (
    <div>
      <aside id='sidebar' className='sidebar'>

        <ul className="sidebar-nav" id='sidebar-nav'>

            <li className='nav-item'>
                <a className='nav-link' href='FDashboard'>
                    <i className='bi bi-grid'></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#components-nav' data-bs-toggle='collapse' href='PredictionDetails'>
                    <i className='bi bi-menu-button-wide'></i>
                    <span>Supply Predictions</span>
                    <i className='bi bi-chevron-down ms-auto'></i>
                </a>

                <ul id='components-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>

                    <li>
                        <a onClick={handleAddModalOpen}>
                            <i className='bi bi-circle'>
                                <span>Add Supply Prediction</span>
                            </i>
                        </a>
                    </li>
                    <li>
                        <a href='PredictionDetails'>
                            <i className='bi bi-circle'>
                                <span>Previous Predictions</span>
                            </i>
                        </a>
                    </li>
                </ul>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#tables-nav' data-bs-toggle='collapse' href='#'>
                    <i className='bi bi-layout-text-window-reverse'></i>
                    <span>Documents</span>
                    <i className='bi bi-chevron-down ms-auto'></i>
                </a>

                <ul id='tables-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
                    
                    <li>
                        <a href='#'>
                            <i className='bi bi-circle'>
                                <span>General Tables</span>
                            </i>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <i className='bi bi-circle'>
                                <span>Data Tables</span>
                            </i>
                        </a>
                    </li>
                   

                </ul>
            </li>

            <li className='nav-heading'>Pages</li>
            <div className='navList'>
                {navList.map(nav => (
                    <li className='nav-item' key={nav._id}>
                    <a className='nav-link collapsed' href ={'/login'}>
                        <i className={nav.icon}></i>
                        <span>{nav.name}</span>
                    </a>
                </li>
                ))}
            </div>
            

        </ul>

            {/* Modal for adding supply prediction */}
            <Modal show={addModalOpen} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Supply Prediction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PredictionForm handleSubmit={handleSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      </aside>
    </div>
  )
}

export default Sidebar;
