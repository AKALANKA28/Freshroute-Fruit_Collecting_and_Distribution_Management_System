import React, { useEffect, useState } from "react";
import axios from "axios";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import VehicleForm from "./VehicleForm";
import VehicleReport from "./VehicleReport";
import "./Vehicle.css";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import { ToastContainer, toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8070/";

function Vehicle() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
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
      const response = await axios.get("/Vehicle/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((vehicle) => {
      const searchFields = [
        "vehicle_no",
        "type",
        "conditions",
        "owner_name",
        "email",
        "phone",
        "Bank",
        "Branch",
        "account_no"
      ];
      return searchFields.some((field) => {
        const fieldValue = vehicle[field];
        if (typeof fieldValue === "string") {
          return fieldValue.toLowerCase().includes(query.toLowerCase());
        }
        return false;
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
    XLSX.utils.book_append_sheet(wb, ws, "Vehicle Report");
  
    // Generate the Excel file
    writeFile(wb, "vehicle_report.xlsx");
  };

  const handleButtonClick = () => {
    getFetchData();
    generateExcelFile();
  };

  

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  }

  const handleEditModalOpen = (vehicle) => {
    setSelectedVehicle(vehicle);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Vehicle/delete/${id}`);
      toast.error("Successfully Deleted");
      getFetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Vehicle/add", formData);
      toast.success("Vehicle Details Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.patch(`/Vehicle/update/${formData._id}`, formData);
      toast.success("Vehicle Details Updated");
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
              Vehicle Details<span>| {filter}</span>

                <h6>Manage Vehicle</h6>
              </div>
            </div>
            <ul class="table-top-head">
            <li>
                      <BlobProvider
                        document={<VehicleReport dataList={dataList} />}
                        fileName="Vehicle_Report.pdf"
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
            {/* <li>
                  <div className="button-container">
                      <a onClick={handleShowReportModal}>
                          <img src={Pdf} alt="Pdf Icon"  className="icon"  />
                      </a>
                      <Modal show={showReportModal} onHide={handleCloseReportModal}>
          <Modal.Header closeButton>
            <Modal.Title>Vehicle Details Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PDFViewer width="100%" height="500px">

              <VehicleReport dataList={dataList} />
            </PDFViewer>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReportModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      </li> */}
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
                <i className="bi bi-plus-circle"></i> Add Vehicle
              </button>
            </div>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Vehicle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <VehicleForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose} size="x3">
            <Modal.Header closeButton>
              <Modal.Title>Edit Vehicle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <VehicleForm
                handleSubmit={handleEditSubmit}
                initialData={selectedVehicle}
              />
            </Modal.Body>
          </Modal>

          <div className="table-container">
          <SearchBar onSearch={handleSearch} />
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">Vehicle No.</th>
                  <th scope="col">Type</th>
                  <th scope="col">Conditions</th>
                  <th scope="col">Payload</th>
                  <th scope="col">Owner Name</th>
                  {/* <th scope="col">NIC</th> */}
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Bank</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Acc No.</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {filteredDataList.length ? (
                  filteredDataList.map((vehicle) => (
                    <tr key={vehicle._id}>
                      <td>{vehicle.vehicle_no}</td>
                      <td>{vehicle.type}</td>
                      <td>{vehicle.conditions}</td>
                      <td>{vehicle.capacity} lbs</td>
                      <td>{vehicle.owner_name}</td>
                      {/* <td>{vehicle.nic}</td> */}
                      <td>{vehicle.email}</td>
                      <td>{vehicle.phone}</td>
                      <td>{vehicle.Bank}</td>
                      <td>{vehicle.Branch}</td>
                      <td>{vehicle.account_no}</td>
                      <td className="action">
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(vehicle)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(vehicle._id)}
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
            />
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
