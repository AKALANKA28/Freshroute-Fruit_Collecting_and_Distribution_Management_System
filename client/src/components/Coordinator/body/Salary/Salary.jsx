import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SalaryForm from "./SalaryForm";
import SalaryReport from "./SalaryReport";
import "./Salary.css";

axios.defaults.baseURL = "http://localhost:8070/";

function Salary() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState(null);
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
      const response = await axios.get("/Salary/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearch = (query) => {
    const filteredList = dataList.filter((employee) => {
      const fullName = `${employee.name} ${employee.jobrole}`;
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

  const handleEditModalOpen = (salary) => {
    setSelectedSalary(salary);
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
      await axios.delete(`/Salary/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
      handleCloseDeleteModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Salary/add", formData);
      alert("Salary Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Salary/update/${formData._id}`, formData);
      alert("Salary Updated");
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
    <div id='main' className='main'>
      <br/><br/>
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="card-title">
                Salary Details
                <h6>Manage employee salaries</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <div className="button-container">
                  <a onClick={handleShowReportModal}>
                    <img src={Pdf} alt="Pdf Icon" className="icon" />
                  </a>
                  <Modal show={showReportModal} onHide={handleCloseReportModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Salary Details Report</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <PDFViewer width="100%" height="500px">
                        <SalaryReport dataList={dataList} />
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
            <div className="page-btn">
              <button
                type="button"
                className="btn btn-added"
                onClick={handleAddModalOpen}
              >
                <i className="bi bi-plus-circle"></i> Add Salary
              </button>
            </div>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Salary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SalaryForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Salary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SalaryForm
                handleSubmit={handleEditSubmit}
                initialData={selectedSalary}
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
                  <th scope="col">Job Role</th>
                  <th scope="col">Date</th>
                  <th scope="col">Salary(Rs)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataList.length ? (
                  filteredDataList.map((salary) => (
                    <tr key={salary._id}>
                      <td>{salary.jobrole}</td>
                      <td>{salary.date}</td>
                      <td>{salary.salary}</td>
                      <td className="action">
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(salary)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleShowDeleteModal(salary._id)}
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

export default Salary;
