import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"; // Import moment.js for date manipulation
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from "../../components/SearchBar";
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SalesForm from "./SalesForm";
import SalesReport from "./SalesReport";
import "../Expenses/expense.css";
import CardFilter from "../CardFilter";
import { ToastContainer, toast } from "react-toastify";
// import Pagination from "../../components/Pagination";
import ReportModal from "../../components/PDFReport";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getOrders,
  getSingleOrderData,
} from "../../../../features/orders/orderSlice";
import ProductDropdown from "./ProductDropdown";
import Pagination from "../../components/Pagination";
axios.defaults.baseURL = "http://localhost:8070/";

function Sales() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedSales, setSelectedSales] = useState(null);
  const [filter, setFilter] = useState("Today");
  const [filteredDataList, setFilteredDataList] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();

  const getUserId = location.pathname.split("/")[3];
  // console.log(getUserId)
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(null); // State to hold form data

  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(4); // Number of items per page

  // Calculate total number of pages based on 5 rows per page
  const totalPages = Math.ceil(filteredDataList.length / pageSize);

  // Calculate the start and end index of items for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredDataList.length);

  // Get the current page of items to display (5 rows)
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

  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getOrders(config));
  }, [dispatch]);

  const orderState = useSelector((state) => state.orders.orders);
  console.log(orderState);


  

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/user/allorders");
      const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDataList(sortedData);
      filterData(sortedData, filter); // Filter data after fetching

    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    filterData(dataList, filter); // Re-filter data when filter state changes
  }, [dataList, filter]);


  const filterData = (data, selectedFilter) => {
    const currentDate = moment(); // Get current date
    let filteredList = [];
    
    switch (selectedFilter) {
      case "Today":
        filteredList = data.filter(item => moment(item.createdAt).isSame(currentDate, 'day'));
        break;
      case "This Week":
        const startOfWeek = currentDate.clone().startOf('week');
        const endOfWeek = currentDate.clone().endOf('week');
        filteredList = data.filter(item => moment(item.createdAt).isBetween(startOfWeek, endOfWeek, null, '[]'));
        break;
      case "This Month":
        filteredList = data.filter(item => moment(item.createdAt).isSame(currentDate, 'month'));
        break;
      case "This Year":
        filteredList = data.filter(item => moment(item.createdAt).isSame(currentDate, 'year'));
        break;
      default:
        filteredList = data;
    }

    setFilteredDataList(filteredList);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const generateExcelFile = () => {
    // Define the worksheet
    const ws = XLSX.utils.json_to_sheet(dataList);

    // Define the workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Suppliers Report");

    // Generate the Excel file
    writeFile(wb, "suppliers_report.xlsx");
  };

  const handleButtonClick = () => {
    // getFetchData();
    generateExcelFile();
  };

  // Search functionality
// Search functionality
const handleSearch = (query) => {
  const filteredList = dataList.filter((sales) => {
    const fullName = `${sales?.user?.name} ${sales.createdAt}  ${sales.orderItems.map((item) => (
      <li key={item._id}>{item.product.title}</li>
    ))}
      </li>
    ))}} ${sales.amount} ${sales.paid} ${sales.due} ${sales.status}`;
    return fullName.toLowerCase().includes(query.toLowerCase());
  });
  setFilteredDataList(filteredList);
  setCurrentPage(1); // Reset current page to 1 when a new search is performed
};


  const handleRefreshClick = () => {
    // getFetchData();
  };

  const handleModalOpen = (data) => {
    setFormData(data); // Set form data when editing
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setFormData(null); // Reset form data
    setModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {
      if (formData._id) {
        // If _id exists, it's an edit operation
        await axios.patch(`/user/order/update/${formData._id}`, formData);
        alert("Sales Updated");
      } else {
        // Otherwise, it's an add operation
        await axios.post("/user/order", formData);
        alert("Sales Added");
      }
      handleModalClose(); // Close the modal after successful submission
      getFetchData(); // Fetch updated data
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/user/order/delete/${id}`);
      toast.success("Successfully Deleted"); // Correct placement of toast function
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleProductSelect = (productId) => {
    console.log("Selected product:", productId);
    // Handle the selected product here
  };

  

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
              <BlobProvider document={<SalesReport dataList={filteredDataList} />} fileName="SalesReport.pdf" >

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
              {/* <button
                type="button"
                className="btn btn-added"
                onClick={() => setModalOpen(true)}
              >
                <i className="bi bi-plus-circle"></i> Add Sales
              </button> */}
            </div>
          </div>
          {/* Modal for adding and editing sales */}
          <Modal show={modalOpen} onHide={handleModalClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{formData ? "Edit Sales" : "Add Sales"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SalesForm handleSubmit={handleSubmit} initialData={formData} />
            </Modal.Body>
          </Modal>
          <CardFilter filterChange={handleFilterChange} />

          {dataList.length > 0 && (
            <div className="table-container">
<SearchBar onSearch={handleSearch} />


              {/* ---------------table--------------- */}
              <table className="table table-bordeless datatable">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Fruit</th>
                    <th scope="col">Price (Rs)</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Tax Rate</th>
                    <th scope="col">Total (Rs)</th>
                    <th className="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageItems.map((sales) => (
                    <tr key={sales._id}>
                      <td>{sales?.user?.name}</td>
                      <td>{new Date(sales.createdAt).toLocaleDateString()}</td>
                      <td>
                        <ul>
                          {sales.orderItems.map((item) => (
                            <li key={item._id} className="border-bottom">
                              {item.product.title}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {sales.orderItems.map((item) => (
                            <li key={item._id} className="border-bottom">
                              Rs. {item.price.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {sales.orderItems.map((item) => (
                            <li key={item._id} className="border-bottom">
                              {item.quantity} kg
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>2%</td>
                      <td>
                        Rs.{" "}
                        {(
                          (sales?.totalPrice * 2) / 100 +
                          sales?.totalPrice
                        ).toFixed(2)}
                      </td>
                      {/* <td>
        <span className={`badge bg-${handleStatus(sales.orderStatus)}`}>
          {sales.orderStatus}
        </span>
      </td> */}
                      <td>
                        <div className="buttons">
                          <button disabled
                            className="btn btn-edit"
                            onClick={() => handleModalOpen(sales)}
                            style={{background:"rgb(255 187 0 / 50%)", color:"white" , border:"rgb(255 187 0 / 50%)"}}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(sales._id)}
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Render pagination component */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
              />
            </div>
          )}
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
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageChange={handlePageChange}
      />{" "} */}
    </div>
  );
}

export default Sales;
