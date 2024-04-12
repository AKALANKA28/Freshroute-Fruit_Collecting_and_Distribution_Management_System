import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import FruitTypeForm from "./FruitTypeForm";
import FruitTypeReport from "./FruitTypeReport";
import "./FruitType.css";


axios.defaults.baseURL = "http://localhost:8070/";

function FruitType() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedFruitType, setSelectedFruitType] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]); 

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/FruitType/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((fruittype) => {
      const fullName = `${fruittype.name} ${fruittype.date}`; // Customize this according to your data structure
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDataList(filteredList);
  };

  const handleRefreshClick = () => {
    getFetchData();
  };

  const generateExcelFile = () => {
    // Rearrange the order of properties for each prediction object
    const rearrangedDataList = dataList.map(fruitType => ({
      Name: fruitType.name,
      Date: fruitType.date,
      Description: fruitType.description,
      
    }));
  
    // Define the worksheet
    const ws = XLSX.utils.json_to_sheet(rearrangedDataList);
    
    // Define the workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fruit Type Report");
    
    // Generate the Excel file
    writeFile(wb, "fruitType_report.xlsx");
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

  const handleEditModalOpen = (fruitType) => {
    setSelectedFruitType(fruitType);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/FruitType/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/FruitType/add", formData);
      alert("Fruit Type Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/FruitType/update/${formData._id}`, formData);
      alert("Fruit Type Updated");
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
                  Fruit Details
                  <h6>Manage fruit details</h6>
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
            <Modal.Title>Salary Details Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PDFViewer width="100%" height="500px">
              <FruitTypeReport dataList={dataList} />
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
                <i className="bi bi-plus-circle"></i> Add Fruit Type
              </button>
      </div>
      </div>
      <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Fruit Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FruitTypeForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Fruit Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FruitTypeForm
                handleSubmit={handleEditSubmit}
                initialData={selectedFruitType}
              />
            </Modal.Body>
          </Modal>


      

       
<div className="table-container">
<SearchBar onSearch={handleSearch} />
        <table className="table table-borderless datatable">

          <thead className="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col" >Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredDataList.length ? (
                  filteredDataList.map((fruitType) => (
                <tr key={fruitType._id}>
                  <td>{fruitType.name}</td>
                  <td>{fruitType.date}</td>
                  <td className="description">{fruitType.description}</td>
                  <td>
                    <div className="buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() =>handleEditModalOpen(fruitType)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(fruitType._id)}
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

export default FruitType;
