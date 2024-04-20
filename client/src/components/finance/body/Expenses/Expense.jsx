import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import ExpenseForm from "./ExpenseForm";
import ExpenseReport from "./ExpenseReport";
import "../Expenses/expense.css";
import CardFilter from "../CardFilter";


axios.defaults.baseURL = "http://localhost:8070/";

function Expense() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
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
      const response = await axios.get("/expense/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };


   // Search functionality
   const handleSearch = (query) => {
    const filteredList = dataList.filter((expense) => {
      const fullName = `${expense.customer_name} ${expense.date} ${expense.fruit_name} ${expense.amount} ${expense.paid} ${expense.due} ${expense.status}`; 
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

  const handleEditModalOpen = (expense) => {
    setSelectedExpense(expense);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/expense/add", formData);
      alert("Expense Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/expense/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };



  const handleEditSubmit = async (formData) => {
    try {
      await axios.patch(`/expense/update/${formData._id}`, formData);
      alert("Expense Updated");
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
    <div className="">
     <div className="card recent-sales overflow-auto">    
        <div className="card-body">           
          <div class="page-header">
            <div class="add-item d-flex">
              <div class="card-title">
                    Expense Details<span>| {filter}</span>
                    <h6>Manage your expense</h6>
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
                      <ExpenseReport dataList={dataList} />
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
                <i className="bi bi-plus-circle"></i> Add Expense
              </button>
            </div>
          </div>
          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            
            <Modal.Header closeButton>
              <Modal.Title>Add Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ExpenseForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ExpenseForm
                handleSubmit={handleEditSubmit}
                initialData={selectedExpense}
              />
            </Modal.Body>
          </Modal>
    
          <div className="table-container">
          <SearchBar onSearch={handleSearch} />

{/* ---------------table--------------- */}
          <table className="table table-bordeless datatable">
          <thead className="table-light">
            <tr>
                <th scope="col">Date</th>
                <th scope="col" >Category</th>
                <th scope="col" >Amount</th>
                <th scope="col" >Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataList &&
              filteredDataList.length > 0 &&
              filteredDataList.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>Rs. {expense.amount.toFixed(2)}</td>
                  <td>{expense.description}</td>
                  {/* <td>{expense.status}</td> */}
                  <td>
                    <div className="buttons">
                      <button className="btn btn-edit" onClick={() => handleEditModalOpen(expense)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDelete(expense._id)}>
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

export default Expense;