import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import PredictionForm from "./PredictionForm";
import PredictionReport from "./PredictionReport";

axios.defaults.baseURL = "http://localhost:8070/";

function PredictionsList() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Prediction/");
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

  const handleEditModalOpen = (prediction) => {
    setSelectedPrediction(prediction);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this prediction?");
    if (confirmDelete) {
      try {
        await axios.delete(`/Prediction/delete/${id}`);
        alert("Successfully Deleted");
        getFetchData();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Prediction/add", formData);
      alert("Prediction Added");
      window.location.reload();
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Prediction/update/${formData._id}`, formData);
      alert("Prediction Updated");
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
              Prediction Details
                <h6>Manage Prediction Details</h6>
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
                    <i className="bi bi-plus-circle"></i> Add Supply Prediction
                  </button>
                </div>
              </li>
            </ul>
            <Modal show={showReportModal} onHide={handleCloseReportModal}>
              <Modal.Header closeButton>
                <Modal.Title>Prediction Details Report</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PDFViewer width="100%" height="500px">
                  <PredictionReport dataList={dataList} />
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
              <Modal.Title>Add Supply Prediction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PredictionForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Supply Prediction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PredictionForm
                handleSubmit={handleEditSubmit}
                initialData={selectedPrediction}
              />
            </Modal.Body>
          </Modal>

          <div className="table-container">
            {/* <SearchBar /> */}
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">Fruit Type</th>
                  <th scope="col">Quality</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Date Can Be Given</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataList.length ? (
                  dataList.map((prediction) => (
                    <tr key={prediction._id}>
                      <td>{prediction.fruitType}</td>
                      <td>{prediction.quality}</td>
                      <td>{prediction.quantity}</td>
                      <td>{prediction.price}</td>
                      <td>{prediction.dateCanBeGiven}</td>
                      <td className="action">
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(prediction)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(prediction._id)}
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

export default PredictionsList;