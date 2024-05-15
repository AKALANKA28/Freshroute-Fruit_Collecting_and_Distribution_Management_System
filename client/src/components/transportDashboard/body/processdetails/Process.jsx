import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import { BlobProvider } from "@react-pdf/renderer";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import ProcessForm from "./ProcessForm";
import ProcessReport from "./ProcessReport";
import "./Process.css";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";

axios.defaults.baseURL = "http://localhost:8070/";

function Process() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedProcess, setSelectedProcess] = useState(null);
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
      const response = await axios.get("/Process/");
      setDataList(response.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((process) => {
      const searchFields = [
        "process_ID",
        "vehicle_no",
        "driver_name",
        "current_status"
      ];
      return searchFields.some((field) => {
        const fieldValue = process[field];
        if (typeof fieldValue === "string") {
          return fieldValue.toLowerCase().includes(query.toLowerCase());
        }
        // If fieldValue is not a string (like current_status), convert it to string and then check for inclusion
        return String(fieldValue).toLowerCase().includes(query.toLowerCase());
      });
    });
    setFilteredDataList(filteredList);
  };
  

  const handleRefreshClick = () => {
    getFetchData();
    
  };

  const generateExcelFile = () => {
    // Define the worksheet
    const ws = XLSX.utils.json_to_sheet(dataList);
  
    // Define the workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Process Report");
  
    // Generate the Excel file
    writeFile(wb, "Process_report.xlsx");
  };
  
  const handleButtonClick = () => {
    getFetchData(); // Fetch the latest data if needed
    generateExcelFile();
  };
  

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (process) => {
    setSelectedProcess(process);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/process/delete/${id}`);
      toast.error("Successfully Deleted");
      getFetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/process/add", formData);
      toast.success("Process Details Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.patch(`/process/update/${formData._id}`, formData);
      toast.success("Process Details Updated");
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
              Process Details<span>| {filter}</span>

                <h6>Manage process</h6>
              </div>
            </div>
            <ul class="table-top-head">
            <li>
            <BlobProvider
                        document={<ProcessReport dataList={dataList} />}
                        fileName="Process_Report.pdf"
                      >
                        {({ url, blob }) => (
                          <div className="button-container">
                            <a href={url} target="_blank">
                              <img src={Pdf} alt="Pdf Icon" className="icon" />
                            </a>
                          </div>
                        )}
                      </BlobProvider>
      </li>
              <li>
                <div className="button-container"> 
                  <a  onClick={handleButtonClick}>
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
                <i className="bi bi-plus-circle"></i> Add Process
              </button>
            </div>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Process</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProcessForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Process</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProcessForm
                handleSubmit={handleEditSubmit}
                initialData={selectedProcess}
              />
            </Modal.Body>
          </Modal>

          <div className="table-container">
          <SearchBar onSearch={handleSearch} />
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">Process ID</th>
                  <th scope="col">Vehicle Number</th>
                  <th scope="col">Driver Name</th>
                  <th scope="col">Current Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {filteredDataList.length ? (
                  filteredDataList.map((process) => (
                    <tr key={process._id}>
                      <td>{process.process_ID}</td>
                      <td>{process.vehicle_no}</td>
                      <td>{process.driver_name}</td>
                      <td>{process.current_status}</td>
                      
                      <td className="action">
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(process)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(process._id)}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce
      />
    </div>
  );
}

export default Process;
