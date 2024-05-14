import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import PredictionForm from '../body/PredictionDetails/PredictionForm';
import logo from '../../../assests/logo.png'
import { FaChevronRight } from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:8070/";

const Sidebar = () => {

  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar');
  }

    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleAddModalOpen = () => {
      setAddModalOpen(true);
    };
  
    const handleAddModalClose = () => {
      setAddModalOpen(false);
    };
  
    const handleSubmit = async (formData) => {
      try {
        // Add supply prediction to the Prediction collection
        const response = await axios.post("/Prediction/add", formData);
        const predictionId = response.data._id;
    
        // Create payload to add supply prediction to the pendingSupplies collection
        const pendingSupplyData = {
          ...formData,
          predictionID: predictionId
        };
    
        // Add supply prediction to the pendingSupplies collection
        await axios.post("/pendingSupply/add", pendingSupplyData);
    
        alert("Prediction Added");
        window.location.reload();
        handleAddModalClose();
      } catch (err) {
        alert(err.message);
      }
    };

  return (
    <div>
      <aside id='sidebar' className='sidebar'>
        <a href='/' className='logo d-flex align-items-center'>
           <img src={logo} alt='logo image'/>
           <span className=''>FreshRoute</span>
        </a>
        <hr className='hr'></hr>        
        <FaChevronRight className='toggle-sidebar-btn d-flex align-items-center justify-content-center' onClick={handleToggleSideBar} />

        <ul className="sidebar-nav" id='sidebar-nav'>

            <li className='nav-item'>
                <a className='nav-link' href='FDashboard'>
                    <i className='bi bi-grid'></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#components-nav' data-bs-toggle='collapse' href='PredictionDetails'>
                <i className='bi bi-menu-button-wide' onClick={handleToggleSideBar}></i>
                    <span>Supply Predictions</span>
                    <i className='bi bi-chevron-down ms-auto'></i>
                </a>

                <ul id='components-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>

                    <li>
                        <a onClick={handleAddModalOpen}>
                            <i className='bi bi-plus-circle' style={{ marginRight: "-30px" }}></i>
                            <span>Add Prediction</span>
                        </a>
                    </li>
                    <li>
                        <a href='PredictionDetails'>
                        <i className='bi bi-list-ul' style={{ marginRight: "-30px" }}></i>
                            <span>Previous Predictions</span>
                        </a>
                    </li>
                </ul>
            </li>

            <hr></hr>
            <div className="mt-16 ">
            <li className='nav-item'>
                <a className='nav-link collapsed' href='/'>
                    <i class="bi bi-gear"></i>
                    <span>Settings</span>
                </a>
            </li> <li className='nav-item'>
                <a className='nav-link collapsed' href='/'>
                    <i class="bi bi-box-arrow-left"></i>
                    <span>Logout</span>
                </a>
            </li>
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
