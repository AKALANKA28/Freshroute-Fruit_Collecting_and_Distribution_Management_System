import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import ScheduleForm from "./ScheduleForm";
import ScheduleReport from "./ScheduleReport";
import "./Schedule.css";

axios.defaults.baseURL = "http://localhost:8070/";

function Schedule() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [filter, setFilter] = useState('Today');

  const [filteredDataList, setFilteredDataList] = useState([]); 

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Schedule/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((employee) => {
      const fullName = `${employee.name} ${employee.jobrole}`; // Customize this according to your data structure
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

  const handleEditModalOpen = (schedule) => {
    setSelectedSchedule(schedule);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Schedule/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Schedule/add", formData);
      alert("Schedule Details Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.patch(`/Schedule/update/${formData._id}`, formData);
      alert("Schedule Details Updated");
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
              Schedule Details<span>| {filter}</span>

                <h6>Manage Schedule</h6>
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
            <Modal.Title>Schedule Details Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PDFViewer width="100%" height="500px">
              <ScheduleReport dataList={dataList} />
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
                <i className="bi bi-plus-circle"></i> Add Schedule
              </button>
            </div>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ScheduleForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ScheduleForm
                handleSubmit={handleEditSubmit}
                initialData={selectedSchedule}
              />
            </Modal.Body>
          </Modal>

          <div className="table-container">
          <SearchBar onSearch={handleSearch} />
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">Schedule ID</th>
                  <th scope="col">Vehicle Number</th>
                  <th scope="col">Driver Name</th>
                  <th scope="col">Pickup Location</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Date</th>
                  <th scope="col">Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {filteredDataList.length ? (
                  filteredDataList.map((schedule) => (
                    <tr key={schedule._id}>
                      <td>{schedule.schedule_ID}</td>
                      <td>{schedule.vehicle_no}</td>
                      <td>{schedule.driver_name}</td>
                      <td>{schedule.pickup_location}</td>
                      <td>{schedule.destination}</td>
                      <td>{schedule.date}</td>
                      <td>{schedule.quantity}</td>
                      <td className="action">
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(schedule)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(schedule._id)}
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

export default Schedule;
