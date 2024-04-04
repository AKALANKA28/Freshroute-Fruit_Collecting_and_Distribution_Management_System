import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import CategoryForm from "./CategoryForm";
import CategoryPriceForm from "./CategoryPriceForm";
import CategoryReport from "./CategoryReport";
import "./Category.css";

axios.defaults.baseURL = "http://localhost:8070/";

function Category() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]); 

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Category/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((category) => {
      const fullName = `${category.fruit} ${category.category} ${category.date} ${category.quality}`; // Customize this according to your data structure
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Category/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Category/add", formData);
      alert("Category Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Category/update/${formData._id}`, formData);
      alert("Category Updated");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePriceSubmit = async (formData) => {
    try {
      await axios.put(`/Category/update/${formData._id}`, formData);
      alert("Category Priced");
      handlePriceModalClose();
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
          <div className="page-header">
            <div class="add-item d-flex">
              <div class="card-title">
              Category Details
                <h6>Manage Category Details</h6>
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
            <Modal.Title>Category Details Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PDFViewer width="100%" height="500px">
              <CategoryReport dataList={dataList} />
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
              <Modal.Title>Pricing for Category</Modal.Title>
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


      <div className="table-container">
      <SearchBar onSearch={handleSearch} />
        <table className="table table-borderless datatable">
          <thead className="table-light">
            <tr>
              <th scope="col">Fruit</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col">Weight</th>
              <th scope="col">Quality</th>
              <th scope="col">Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredDataList.length ? (
                  filteredDataList.map((category) => (
                <tr key={category._id}>
                  <td>{category.fruit}</td>
                  <td>{category.category}</td>
                  <td>{category.date}</td>
                  <td>{category.weight}</td>
                  <td>{category.quality}</td>
                  <td>{category.price}</td>
                  <td className="action">
                    <div className="buttons">

                    <button
                        className="btn btn-edit"
                        onClick={() => handlePriceModalOpen(category)}
                      >
                        <i class="bi bi-calculator-fill"></i>
                      </button>

                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditModalOpen(category)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(category._id)}
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
      </div>
    </div>
  );
}

export default Category;
