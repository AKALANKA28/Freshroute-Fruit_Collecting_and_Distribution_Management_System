import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import TransportFeeForm from "./TransportFeeForm";
import TransportFeeReport from "./TransportFeeReport";
import "./TransportFee.css";

axios.defaults.baseURL = "http://localhost:8070/";

function TransportFee() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedTransportFee, setSelectedTransportFee] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]); 

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); 
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/TransportFee/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((transportfee) => {
      const fullName = `${transportfee.vehicletype} ${transportfee.pricepkm} ${transportfee.maxweight}`; // Customize this according to data structure
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

  const handleEditModalOpen = (transportFee) => {
    setSelectedTransportFee(transportFee);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/TransportFee/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/TransportFee/add", formData);
      alert("Transport Fee Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/TransportFee/update/${formData._id}`, formData);
      alert("Transport Fee Updated");
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
              Transport Fee Details
                <h6>Manage Transport Fees</h6>
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
            <Modal.Title>Transport Fee Details Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PDFViewer width="100%" height="500px">
              <TransportFeeReport dataList={dataList} />
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
                <i className="bi bi-plus-circle"></i> Add Transport Fee
              </button>
            </div>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Transport Fee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TransportFeeForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Transport Fee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TransportFeeForm
                handleSubmit={handleEditSubmit}
                initialData={selectedTransportFee}
              />
            </Modal.Body>
          </Modal>
      <div className="table-container">
      <SearchBar onSearch={handleSearch} />
        <table className="table table-borderless datatable">
          <thead className="table-light">
            <tr>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Date</th>
              <th scope="col">MaxWeight(kg)</th>
              <th scope="col">Price per km (Rs)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredDataList.length ? (
                  filteredDataList.map((transportfee) => (
                <tr key={transportfee._id}>
                  <td>{transportfee.vehicletype}</td>
                  <td>{transportfee.date}</td>
                  <td>{transportfee.maxweight}</td>
                  <td>{transportfee.pricepkm}</td>
                  <td className="action">
                    <div className="buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditModalOpen(transportfee)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(transportfee._id)}
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

export default TransportFee;
