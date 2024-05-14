import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import ResourceAccessForm from "./ResourceAccessForm";
import AccResourceReport from "./AccResourceReport";
import "./AccResource.css";
//import "./AccResourceForm.css";


axios.defaults.baseURL = "http://localhost:8070/";

function AccResource() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedCompaign, setSelectedCompaign] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  useEffect(() => {
    getFetchData();
  }, []);
  useEffect(() => {
    setFilteredDataList(dataList);
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/AccResource/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };
  const handleSearch = (query) => {
    const filteredList = dataList.filter((AccResource) => {
      const fullName = `${AccResource.location} ${AccResource.resourceType}`;
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

  const handleEditModalOpen = (AccResource) => {
    setSelectedCompaign(AccResource);
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
      await axios.delete(`/AccResource/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
      handleCloseDeleteModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/AccResource/add", formData);
      alert("Aplication Form Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/AccResource/update/${formData._id}`, formData);
      alert("Aplication Form Updated");
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
    <div id="main">
    <div className="card recent-sales overflow-auto">
     
          <div className="card-body">
          
            <div class="page-header">
              <div class="add-item d-flex">

              <div class="card-title">
                  Resource Access Aplication Form
                  <h6>Manage Aplication details</h6>
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
            <Modal.Title>Aplication Details Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PDFViewer width="100%" height="500px">
              <AccResourceReport dataList={dataList} />
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
                          <img src={Excel} alt="Excel Icon"  className="icon"  />
                      </a>
                  </div>
                </li>  
                <li>
                  <div className="button-container">
                      <a href="#" onClick={handleRefreshClick}>
                      <img src={Refresh} alt="Refresh Icon"  className="icon"  />
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
                <i className="bi bi-plus-circle"></i> Apply 
              </button>
      </div>
      </div>
      <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Apply</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ResourceAccessForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Aplication</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ResourceAccessForm
                handleSubmit={handleEditSubmit}
                initialData={selectedCompaign}
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
      <SearchBar/>
        <table className="table table-borderless datatable">

          <thead className="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col" >Contact No</th>
              <th scope="col" >Location</th>
              <th scope="col" >Farm Size</th>
              <th scope="col" >Fruit Type</th>
              <th scope="col" >Production Capacity</th>
              <th scope="col" >Resource Type</th>
              <th scope="col" >Details of Requirement</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length ? (
              dataList.map((accresource) => (
                <tr key={accresource._id}>
                  <td>{accresource.name}</td>
                  <td>{accresource.email}</td>
                  <td>{accresource.contactNumber}</td>
                  <td>{accresource.location}</td>
                  <td>{accresource.farmSize}</td>
                  <td>{accresource.fruitType}</td>
                  <td>{accresource.productionCapacity}</td>
                  <td>{accresource.resourceType}</td>
                  <td>{accresource.detailReq}</td>
                  
                  <td>
                    <div className="buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() =>handleEditModalOpen(accresource)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(accresource._id)}
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

export default AccResource;
