import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SalesForm from "./SalesForm";
import SalesReport from "./SalesReport";
import "../Expenses/expense.css";
import CardFilter from "../CardFilter";


axios.defaults.baseURL = "http://localhost:8070/";

function Sales() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedSales, setSelectedSales] = useState(null);
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
      const response = await axios.get("/sales/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };


   // Search functionality
   const handleSearch = (query) => {
    const filteredList = dataList.filter((sales) => {
      const fullName = `${sales.customer_name} ${sales.date} ${sales.fruit_name} ${sales.amount} ${sales.paid} ${sales.due} ${sales.status}`; 
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

  const handleEditModalOpen = (sales) => {
    setSelectedSales(sales);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/sales/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/sales/add", formData);
      alert("Sales Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.patch(`/sales/update/${formData._id}`, formData);
      alert("Sales Updated");
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
                    Sales Details<span>| {filter}</span>
                    <h6>Manage your sales</h6>
                </div>
            </div>
{/*---------------- pdf,excel report generating icon and refresh -------------------*/}

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
                      <SalesReport dataList={dataList} />
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
                <i className="bi bi-plus-circle"></i> Add Sales
              </button>
            </div>
          </div>
          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            
            <Modal.Header closeButton>
              <Modal.Title>Add Sales</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SalesForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Sales</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SalesForm
                handleSubmit={handleEditSubmit}
                initialData={selectedSales}
              />
            </Modal.Body>
          </Modal>
    
          <div className="table-container">
          <SearchBar onSearch={handleSearch} />

{/* ---------------table--------------- */}
          <table className="table table-bordeless datatable">
          <thead className="table-light">
            <tr>
                <th scope="col">Customer</th>
                <th scope="col">Date</th>
                <th scope="col" >Fruit</th>
                <th scope="col" >Amount</th>
                <th scope="col" >Paid (Rs)</th>
                <th scope="col" >Due (Rs)</th>
                <th scope="col" >Status</th>
                <th className="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataList &&
              filteredDataList.length > 0 &&
              filteredDataList.map((sales) => (
                <tr key={sales._id}>
                  <td>{sales.customer_name}</td>
                  <td>{sales.date}</td>
                  <td>{sales.fruit_name}</td>
                  <td>Rs. {sales.amount.toFixed(2)}</td>
                  <td>Rs. {sales.paid.toFixed(2)}</td>
                  <td>Rs. {sales.due.toFixed(2)}</td>
                  <td>{sales.status}</td>
                  <td>
                    <div className="buttons">
                      <button className="btn btn-edit" onClick={() => handleEditModalOpen(sales)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDelete(sales._id)}>
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>

        </table>
          </div>
        </div>
    </div>
  </div>
  );
}

export default Sales;