import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from '../../components/SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SalesForm from "./SalesForm";
import SalesReport from "./SalesReport";
import "../Expenses/expense.css";
import CardFilter from "../CardFilter";
import { ToastContainer } from "react-toastify";
import Pagination from "../../components/Pagination";
import ReportModal from "../../components/ReportModal";


axios.defaults.baseURL = "http://localhost:8070/";

function Sales() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedSales, setSelectedSales] = useState(null);
  const [filter, setFilter] = useState('Today');
  const [filteredDataList, setFilteredDataList] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Number of items per page

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
    setCurrentPage(1); // Reset current page to 1 when a new search is performed

  };

//Pagination 

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredDataList.length / pageSize);

    // Calculate the start and end index of items for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredDataList.length);
  
    // Get the current page of items to display
    const currentPageItems = filteredDataList.slice(startIndex, endIndex);
  
    // Function to handle next page
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    // Function to handle previous page
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    // Function to handle page navigation
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    // Function to handle page size change
    const handlePageSizeChange = (size) => {
      setPageSize(size);
      setCurrentPage(1); // Reset current page to 1 when page size changes
    };

 // Render pagination component
 const renderPagination = () => {
  // Generate an array of page numbers from 1 to totalPages
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);
  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
      {pages.map((page) => (
        <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
      ))}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};
    //Pagination End

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
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/sales/delete/${id}`);
      alert("Successfully Deleted");
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
        <div className="card-body table-body">           
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

                <ReportModal show={showReportModal} handleClose={handleCloseReportModal} dataList={dataList} />


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
          <Modal show={addModalOpen} onHide={handleAddModalClose} className="p-0 m-0">
            
            <Modal.Header closeButton>
              <Modal.Title>Add Sales</Modal.Title>
            </Modal.Header>
            <Modal.Body >
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
              {currentPageItems.map((sales) => (
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
     {/* Render pagination */}
     <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageChange={handlePageChange}
      />  </div>
  );
}

export default Sales;