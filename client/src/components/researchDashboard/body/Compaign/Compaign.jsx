import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import CompaignForm from "./CompaignForm";
import CompaignReport from "./CompaignReport";
import "./Compaign.css";

axios.defaults.baseURL = "http://localhost:8070/";

function Compaign() {
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
      const response = await axios.get("/Compaign/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearch = (query) => {
    const filteredList = dataList.filter((compaign) => {
      const fullName = `${compaign.compaign_title} ${compaign.target_aud} ${compaign.date}`;
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

  const handleEditModalOpen = (compaign) => {
    setSelectedCompaign(compaign);
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
      await axios.delete(`/Compaign/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
      handleCloseDeleteModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Compaign/add", formData);
      alert("Compaign Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Compaign/update/${formData._id}`, formData);
      alert("Compaign Updated");
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
          <div class="page-header">
            <div class="add-item d-flex">
              <div class="card-title">
                Active Campaigns
                <h6>Manage Campaign details</h6>
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
            <Modal.Title>Active campaigns Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PDFViewer width="100%" height="500px">
              <CompaignReport dataList={dataList} />
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
                <i className="bi bi-plus-circle"></i> Add Campaign
              </button>
      </div>
      </div>
      <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Campaign</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CompaignForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Campaign</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CompaignForm
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
      <SearchBar onSearch={handleSearch}/>
        <table className="table table-borderless datatable">

          <thead className="table-light">
            <tr>
              <th scope="col">Campaign Title</th>
              <th scope="col">Date</th>
              <th scope="col" >Objective</th>
              <th scope="col" >Target audience</th>
              <th scope="col" >Budjet(Rs)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataList.length ? (
              filteredDataList.map((compaign) => (
                <tr key={compaign._id}>
                  <td>{compaign.compaign_title}</td>
                  <td>{compaign.date}</td>
                  <td>{compaign.objective}</td>
                  <td>{compaign.target_aud}</td>
                  <td>{compaign.budjet}</td>
                  <td className="action">
                  
                    <div className="buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() =>handleEditModalOpen(compaign)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(compaign._id)}
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

export default Compaign;
