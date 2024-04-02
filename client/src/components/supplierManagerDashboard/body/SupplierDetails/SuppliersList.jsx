import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import FarmerForm from "./FarmerForm";
import SupplierReport from "./SupplierReport";

axios.defaults.baseURL = "http://localhost:8070/";

function SuppliersList() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Farmer/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
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

  const handleEditModalOpen = (farmer) => {
    setSelectedFarmer(farmer);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this farmer?");
    if (confirmDelete) {
      try {
        await axios.delete(`/Farmer/delete/${id}`);
        alert("Successfully Deleted");
        getFetchData();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Farmer/add", formData);
      alert("Farmer Added");
      window.location.reload();
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Farmer/update/${formData._id}`, formData);
      alert("Farmer Updated");
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
    <div  id="main col-8">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div class="add-item d-flex">
              <div class="card-title">
                Supplier Details
                <h6>Manage Supplier Details</h6>
              </div>
            </div>
            <ul class="table-top-head" style={{ float: "right" }}>
              <li>
                <div className="button-container">
                  <a onClick={handleShowReportModal}>
                    <img src={Pdf} alt="Pdf Icon" className="icon" />
                  </a>
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
              <li>
                <div class="page-btn">
                  <button
                    type="button"
                    className="btn btn-added"
                    onClick={handleAddModalOpen}
                  >
                    <i className="bi bi-plus-circle"></i> Add Farmer
                  </button>
                </div>
              </li>
            </ul>
            <Modal show={showReportModal} onHide={handleCloseReportModal}>
              <Modal.Header closeButton>
                <Modal.Title>Supplier Details Report</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PDFViewer width="100%" height="500px">
                  <SupplierReport dataList={dataList} />
                </PDFViewer>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseReportModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Farmer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FarmerForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Farmer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FarmerForm
                handleSubmit={handleEditSubmit}
                initialData={selectedFarmer}
              />
            </Modal.Body>
          </Modal>

          <div className="table-container">
            {/* <SearchBar /> */}
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">NIC</th>
                  <th scope="col">Username</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">City</th>
                  <th scope="col">Lane</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataList.length ? (
                  dataList.map((farmer) => (
                    <tr key={farmer._id}>
                      <td>{farmer.NIC}</td>
                      <td>{farmer.username}</td>
                      <td>{farmer.name}</td>
                      <td>{farmer.email}</td>
                      <td>{farmer.city}</td>
                      <td>{farmer.lane}</td>
                      <td className="action">
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(farmer)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(farmer._id)}
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

export default SuppliersList;