import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import ResourceForm from "./ResourceForm";
import ResourceReport from "./ResourceReport";
import "./Resource.css";

axios.defaults.baseURL = "http://localhost:8070/";

function Resource() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Resource/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((resource) => {
      const fullName = `${resource.resource_type}`; // Customize this according to your data structure
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDataList(filteredList);
  };


  const handleRefreshClick = () => {
    getFetchData();
    
  };

  const handleButtonClick = () => {
    getFetchData();
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (resource) => {
    setSelectedResource(resource);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Resource/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
      handleCloseDeleteModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Resource/add", formData);
      alert("Resource Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Resource/update/${formData._id}`, formData);
      alert("Resource Updated");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const [showReportModal, setShowReportModal] = useState(false);

  const handleCloseReportModal = () => setShowReportModal(false);
  const handleShowReportModal = () => setShowReportModal(true);




  return (
    <div className="main">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div class="add-item d-flex">
              <div class="card-title">
              Resource Allocation
                <h6>Manage Resources</h6>
              </div>
            </div>
            <ul class="table-top-head">
            <li>
                  <div className="button-container">
                      <a onClick={handleShowReportModal}>
                          <img src={Pdf} alt="Pdf Icon"  className="icon"  />
                      </a>
                      <Modal show={showReportModal} onHide={handleCloseReportModal}>
          <Modal.Header closeButton>
            <Modal.Title>Available Resources Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PDFViewer width="100%" height="500px">
              <ResourceReport dataList={dataList} />
            </PDFViewer>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReportModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      </li>
              <li>
                <div className="button-container">
                  <a href="#" onClick={handleButtonClick}>
                    <img src={Excel} alt="Excel Icon" className="icon" />
                  </a>
                </div>
              </li>
              <li>
                <div className="button-container">
                  <a href="#" onClick={handleRefreshClick}>
                    <img src={Refresh} alt="Refresh Icon" className="icon" />
                  </a>
                </div>
              </li>
            </ul>
            <div class="page-btn">
              <button
                type="button"
                className="btn btn-added"
                onClick={handleAddModalOpen}
              >
                <i className="bi bi-plus-circle"></i> Add Resources
              </button>
            </div>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Resources</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ResourceForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Resources</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ResourceForm
                handleSubmit={handleEditSubmit}
                initialData={selectedResource}
              />
            </Modal.Body>
          </Modal>

          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this record?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDelete(deleteId)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
      

          <div className="table-container">
          <SearchBar onSearch={handleSearch} />
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">Resource Type</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity Available</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {filteredDataList.length ? (
                  filteredDataList.map((resource) => (
                    <tr key={resource._id}>
                      <td>{resource.resource_type}</td>
                      <td>{resource.description}</td>
                      <td>{resource.qty}</td>
                      <td className="action">
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(resource)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(resource._id)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resource;
