import React, { useEffect, useState } from "react";
import axios from "axios";
import { BlobProvider } from "@react-pdf/renderer";
import SearchBar from "../../components/SearchBar";
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import ExpenseReport from "./ExpenseReport";
import "../Expenses/expense.css";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import ExpenseModal from "./ExpenseModal";
import moment from "moment"; // Import moment.js for date manipulation
import CardFilter from "../CardFilter";

axios.defaults.baseURL = "http://localhost:8070/";

function Expense() {
  const [dataList, setDataList] = useState([]);
  const [filter, setFilter] = useState("Today");
  const [filteredDataList, setFilteredDataList] = useState([]);
  // Define state variables
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(null); // State to hold form data for editing

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Number of items per page

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/expense/");
      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setDataList(sortedData);
      filterData(sortedData, filter); // Filter sorted data after fetching
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
        filteredList = data.filter((item) =>
          moment(item.createdAt).isSame(currentDate, "day")
        );
        break;
      case "This Week":
        const startOfWeek = currentDate.clone().startOf("week");
        const endOfWeek = currentDate.clone().endOf("week");
        filteredList = data.filter((item) =>
          moment(item.createdAt).isBetween(startOfWeek, endOfWeek, null, "[]")
        );
        break;
      case "This Month":
        filteredList = data.filter((item) =>
          moment(item.createdAt).isSame(currentDate, "month")
        );
        break;
      case "This Year":
        filteredList = data.filter((item) =>
          moment(item.createdAt).isSame(currentDate, "year")
        );
        break;
      default:
        filteredList = data;
    }

    setFilteredDataList(filteredList);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };
  const handleRefreshClick = () => {
    getFetchData();
  };

  const handleButtonClick = () => {
    getFetchData();
  };

  // Function to open the modal for adding or editing
  const handleModalOpen = (formData = null) => {
    setFormData(formData); // Set initial form data if editing
    setModalOpen(true);
  };

  // Function to close the modal
  const handleModalClose = () => {
    setModalOpen(false);
    setFormData(null); // Reset form data
  };

  // Function to handle form submission
  const handleSubmit = async (formData) => {
    try {
      if (formData._id) {
        // If _id exists in formData, it's an edit operation
        await axios.patch(`/expense/update/${formData._id}`, formData);
        toast.success("Expense Updated");
      } else {
        // Otherwise, it's an add operation
        await axios.post("/expense/add", formData);
        toast.success("Expense Added");
      }
      handleModalClose(); // Close the modal after successful submission
      getFetchData(); // Fetch updated data
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/expense/delete/${id}`);
      toast.error("Successfully Deleted"); // Correct placement of toast function
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
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

  const handleSearch = (query) => {
    const filteredList = dataList.filter((expense) => {
      // Combine all searchable fields into a single string for comparison
      const searchFields = `${expense.date} ${expense.category} ${expense.amount} ${expense.description}`;
      return searchFields.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDataList(filteredList);
  };
  
  return (
    <div className="main">
      <div className="body" id="body">
        <div className="row">
          <>
            <div className="card recent-sales overflow-auto">
              <div className="card-body table-body">
                <div className="page-header">
                  {/* Your other components and UI elements */}
                  <div className="add-item d-flex">
                    <div className="card-title">
                      Expense Details<span>| {filter}</span>
                      <h6>Manage your expense</h6>
                    </div>
                  </div>
                  {/*---------------- pdf,excel report generating icon and refresh -------------------*/}
                  <ul className="table-top-head">
                    <li>
                      <BlobProvider
                        document={<ExpenseReport dataList={filteredDataList} />}
                        fileName="ExpenseReport.pdf"
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
                          <img
                            src={Refresh}
                            alt="Refresh Icon"
                            className="icon"
                          />
                        </a>
                      </div>
                    </li>
                  </ul>
                  <div className="page-btn">
                    <button
                      type="button"
                      className="btn btn-added"
                      onClick={handleModalOpen}
                    >
                      <i className="bi bi-plus-circle"></i> Add Expense
                    </button>
                  </div>
                </div>
                <CardFilter filterChange={handleFilterChange} />

                <div className="table-container" style={{ minHeight: "20rem" }}>
                  <SearchBar onSearch={handleSearch} />
                  {/* ---------------table--------------- */}
                  <table className="table table-bordeless datatable">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Category</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageItems.map((expense) => (
                        <tr key={expense._id}>
                          <td>{new Date(expense.date).toLocaleDateString()}</td>
                          <td>{expense.category}</td>
                          <td>Rs. {expense.amount.toFixed(2)}</td>
                          <td>{expense.description}</td>
                          <td>
                            <div className="buttons">
                              <button
                                className="btn btn-edit"
                                onClick={() => handleModalOpen(expense)}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-delete"
                                onClick={() => handleDelete(expense._id)}
                              >
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Render pagination component */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handleNextPage={handleNextPage}
                  handlePreviousPage={handlePreviousPage}
                />
              </div>
            </div>

            {/* Render ExpenseModal component */}
            <ExpenseModal
              modalOpen={modalOpen}
              handleModalClose={handleModalClose}
              handleSubmit={handleSubmit}
              formData={formData}
            />
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
          </>
        </div>
      </div>
    </div>
  );
}

export default Expense;
