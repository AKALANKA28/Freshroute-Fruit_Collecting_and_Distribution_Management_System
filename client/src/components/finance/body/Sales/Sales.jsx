import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { ToastContainer } from "react-toastify";
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

  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(5); // Number of items per page

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

  // const handleStatus = (status) => {
  //   switch (status) {
  //     case "Paid":
  //       return "success";
  //       break;
  //     case "Pending":
  //       return "warning";
  //       break;
  //     case "Rejected":
  //       return "danger";
  //       break;
  //     default:
  //       return "success";
  //   }
  // };

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/user/allorders");
      setDataList(response.data);

    } catch (err) {
      alert(err.message);
    }
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
  const handleSearch = (query) => {
    const filteredList = dataList.filter((sales) => {
      const fullName = `${sales.customer_name} ${sales.date} ${sales.fruit_name} ${sales.amount} ${sales.paid} ${sales.due} ${sales.status}`;
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDataList(filteredList);
    setCurrentPage(1); // Reset current page to 1 when a new search is performed
  };

  const handleRefreshClick = () => {
    // getFetchData();
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
      await axios.delete(`/user/order/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.patch(`/user/order/update/${formData._id}`, formData);
      alert("Sales Updated");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
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
                <BlobProvider
                  document={<SalesReport />}
                  fileName="SalesReport.pdf"
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
                <i className="bi bi-plus-circle"></i> Add Sales
              </button>
            </div>
          </div>
          <Modal
            show={addModalOpen}
            onHide={handleAddModalClose}
            className="p-0 m-0"
          >
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
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(sales)}
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
              <div className="pagination align-items-center  justify-content-end">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="me-4"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "none",
                    padding: "0px 10px",
                  }}
                >
                  <i class="bi bi-chevron-left"></i>{" "}
                </button>
                <span
                  className="text-dark"
                  style={{ fontSize: "18px", fontWeight: "500" }}
                >
                  <span className="me-4">{currentPage}</span>
                  <span>{totalPages}</span>
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="ms-4"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "none",
                    padding: "0px 10px",
                  }}
                >
                  <i class="bi bi-chevron-right"></i>{" "}
                </button>
              </div>
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
