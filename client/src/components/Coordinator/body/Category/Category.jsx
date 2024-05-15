import React, { useEffect, useState } from "react";
import axios from "axios";
import { BlobProvider, } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import CategoryForm from "./CategoryForm";
import CategoryPriceForm from "./CategoryPriceForm";
import CategoryReport from "./CategoryReport";
import SpinnerModal from '../../../spinner/SpinnerModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Category.css";

axios.defaults.baseURL = "http://localhost:8070/";

function Category() {
  const [loading, setLoading] = useState(true); 
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [sortColumn, setSortColumn] = useState("fruit");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showReportModal, setShowReportModal] = useState(false);
  const [fruitNames, setFruitNames] = useState([]);
  const [selectedFruit, setSelectedFruit] = useState("all");
  const [selectedQuality, setSelectedQuality] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  

  useEffect(() => {
    // Fetch data
    getFetchData();
    // Simulate loading for 3 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
  
    fetchFruitNames();
  }, []);

  useEffect(() => {
    filterDataList(selectedFruit, selectedQuality);
  }, [dataList, selectedFruit, selectedQuality]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Category/");
      setDataList(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchFruitNames = async () => {
    try {
      const response = await axios.get("/fruitType/");
      setFruitNames(response.data.map(fruit => fruit.name));
    } catch (err) {
      console.error("Error fetching fruit names:", err);
    }
  };

  const handleQualitySelect = (quality) => {
    setSelectedQuality(quality);
  };

  const handleFruitSelect = (fruit) => {
    setSelectedFruit(fruit);
  };

  const filterDataList = (fruit, quality) => {
    if (fruit === "all" && quality === "all") {
      setFilteredDataList(dataList);
    } else if (fruit === "all") {
      const filteredList = dataList.filter((category) => category.quality === quality);
      setFilteredDataList(filteredList);
    } else if (quality === "all") {
      const filteredList = dataList.filter((category) => category.fruit === fruit);
      setFilteredDataList(filteredList);
    } else {
      const filteredList = dataList.filter((category) => category.fruit === fruit && category.quality === quality);
      setFilteredDataList(filteredList);
    }
  };

  const handleSearch = (query) => {
    const filteredList = dataList.filter((category) => {
      const fullName = `${category.fruit} ${category.category} ${category.date} ${category.quality}`;
      return fullName.toLowerCase().includes(query.toLowerCase()) && 
        (selectedQuality === "all" || category.quality === selectedQuality);
    });
    setFilteredDataList(filteredList);
  };

  const generateExcelFile = () => {
    
    const rearrangedDataList = dataList.map(category => ({
      
      Date: category.date,
      Fruit: category.fruit,
      Category: category.category,
      Quality: category.quality,
      Quality_Description: category.qualityDesc,
      Price: category.price,
      
    }));
  
    // Define the worksheet
    const ws = XLSX.utils.json_to_sheet(rearrangedDataList);
    
    // Define the workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fruit Category Report");
    
    // Generate the Excel file
    writeFile(wb, "fruit_category_report.xlsx");
  };

  const handleRefreshClick = () => {
    getFetchData();
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
  };

  const handleEditModalOpen = (category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handlePriceModalOpen = (category) => {
    setSelectedCategory(category);
    setPriceModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handlePriceModalClose = () => {
    setPriceModalOpen(false);
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Category/delete/${id}`);
      toast.success("Successfully Deleted !");
      getFetchData();
      handleCloseDeleteModal(); // Close the modal after successful deletion
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Category/add", { ...formData, imageUrl: formData.imageUrl });
      toast.success("Category Added !");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Category/update/${formData._id}`,  { ...formData, imageUrl: formData.imageUrl });
      toast.success("Category Updated !");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handlePriceSubmit = async (formData) => {
    try {
      await axios.put(`/Category/update/${formData._id}`, formData);
      toast.success("Category Priced !");
      handlePriceModalClose();
      getFetchData();
    } catch (err) {
      console.error("Error pricing category:", err);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  
  const sortedDataList = [...filteredDataList].sort((a, b) => {
    const columnA = a[sortColumn].toLowerCase();
    const columnB = b[sortColumn].toLowerCase();
    if (columnA < columnB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div id='main' className='main'>
      <br/><br/>
      {loading ? ( // Display spinner while loading is true
        <SpinnerModal show={loading} />
      ) : (
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="card-title">
                Category Details
                <h6>Manage Category Details</h6>
              </div>
            </div>
            <ul className="table-top-head">
            <li>
              <BlobProvider
                  document={<CategoryReport dataList={dataList}/>}
                  fileName="CategoryReport.pdf"
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
            <div className="page-btn">
              <button
                type="button"
                className="btn btn-added"
                onClick={handleAddModalOpen}
              >
                <i className="bi bi-plus-circle"></i> Add Category
              </button>
            </div>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CategoryForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CategoryForm
                handleSubmit={handleEditSubmit}
                initialData={selectedCategory}
              />
            </Modal.Body>
          </Modal>

          <Modal show={priceModalOpen} onHide={handlePriceModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Pricing for Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CategoryPriceForm
                handleSubmit={handlePriceSubmit}
                initialData={selectedCategory}
              />
            </Modal.Body>
          </Modal>

          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this record?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDelete(deleteId)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="search-dropdown-container">
            <SearchBar onSearch={handleSearch} />
            <div className="dropdown">
              <select
                className="form-select"
                name="fruit"
                onChange={(e) => handleFruitSelect(e.target.value)}
                value={selectedFruit}
                required
              >
                <option value="all">All Fruits</option>
                {fruitNames.map((fruit, index) => (
                  <option key={index} value={fruit}>{fruit}</option>
                ))}
              </select>
            </div>
            <div className="dropdown">
              <select
                className="form-select"
                name="quality"
                onChange={(e) => handleQualitySelect(e.target.value)}
                value={selectedQuality}
                required
              >
                <option value="all">All Qualities</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>
          <br/>
          <table className="table table-borderless datatable">
            <thead className="table-light">
              <tr>
              <th scope="col">Image</th>
                <th scope="col">Date</th>
                <th scope="col" onClick={() => handleSort("fruit")}>Fruit</th>
                <th scope="col" onClick={() => handleSort("category")}>Category</th>
                <th scope="col">Quality</th>
                <th scope="col">Quality Description</th>
                <th scope="col">Price per Kg</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedDataList.length ? (
                sortedDataList.map((category) => (
                  <tr key={category._id}>
                    <td>
                        {category.imageUrl && (
                          <img
                            src={category.imageUrl}
                            alt="Fruit Image"
                            style={{ width: "50px", height: "50px" }}
                          />
                        )}
                      </td>
                    <td>{category.date}</td>
                    <td>{category.fruit}</td>
                    <td>{category.category}</td>
                    <td>{category.quality}</td>
                    <td className="description2">{category.qualityDesc}</td>
                    <td>{category.price ? `Rs.${category.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}</td>


                    <td className="action">
                      <div className="buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() => handlePriceModalOpen(category)}
                        >
                          <i className="bi bi-calculator-fill"></i>
                        </button>
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEditModalOpen(category)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleShowDeleteModal(category._id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
       )}
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
  );
}

export default Category;
