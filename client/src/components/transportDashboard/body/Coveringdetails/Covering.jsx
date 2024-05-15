import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import { BlobProvider } from "@react-pdf/renderer";
import SearchBar from "./SearchBar";
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import CoveringForm from "./CoveringForm";
import Vehicle from "../transportdetails/Vehicle"; // Import Vehicle component
import CoveringReport from "./CoveringReport";
import "./Covering.css";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";

axios.defaults.baseURL = "http://localhost:8070/";

function Covering() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedCovering, setSelectedCovering] = useState(null);
  const [filter, setFilter] = useState("Today");
  const [vehicles, setVehicles] = useState([]); // State to hold vehicle details

  const [filteredDataList, setFilteredDataList] = useState([]);

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  // useEffect(() => {
  //   // Fetch vehicle details from backend API
  //   const fetchVehicles = async () => {
  //     try {
  //       const response = await axios.get("/vehicles/");
  //       setVehicles(response.data);
  //     } catch (error) {
  //       console.error("Error fetching vehicle details:", error);
  //     }
  //   };

  //   fetchVehicles();
  // }, []); // Run this effect only once when the component mounts

  const getFetchData = async () => {
    try {
      const response = await axios.get("/coverings/");
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

  const generateExcelFile = () => {
    // Define the worksheet
    const ws = XLSX.utils.json_to_sheet(dataList);

    // Define the workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Covering Report");

    // Generate the Excel file
    writeFile(wb, "Covering_report.xlsx");
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

  const handleEditModalOpen = (Covering) => {
    setSelectedCovering(Covering);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/coverings/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/coverings/add", formData);
      toast.success("Covering Details Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.patch(`/Covering/update/${formData._id}`, formData);
      toast.success("Covering Details Updated");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      toast.error(err.message);
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
                Covering Details<span>| {filter}</span>
                <h6>Manage Covering</h6>
              </div>
            </div>
            <ul class="table-top-head">
              <li>
                <BlobProvider
                  document={<CoveringReport dataList={dataList} />}
                  fileName="Covering_Report.pdf"
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
                  <a onClick={handleButtonClick}>
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
                <i className="bi bi-plus-circle"></i> Add Covering
              </button>
            </div>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Covering</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CoveringForm handleSubmit={handleAddSubmit} vehicles={vehicles} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Covering</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CoveringForm
                handleSubmit={handleEditSubmit}
                initialData={selectedCovering}
                vehicles={vehicles}
              />
            </Modal.Body>
          </Modal>
          <div className="table-container">
            <SearchBar onSearch={handleSearch} />
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">Vehicle Number</th>
                  <th scope="col">Owner Name</th>
                  <th scope="col"> Total Coverings(Km)</th>
                  <th scope="col">Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataList.length ? (
                  filteredDataList.map((Covering) => (
                    <tr key={Covering._id}>
                      <td>{Covering.vehicle_no}</td>
                      <td>{Covering.owner_name}</td>
                      <td>{Covering.total_coverings}</td>
                      <td>{Covering.date}</td>

                      <td className="action">
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(Covering)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(Covering._id)}
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

export default Covering;
