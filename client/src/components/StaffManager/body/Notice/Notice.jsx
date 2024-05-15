import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import SearchBar from "./SearchBar";
import Refresh from "../../../../assests/img/icons/refresh.png";
import NoticeForm from "./NoticeForm";
import SpinnerModal from '../../../spinner/SpinnerModal'
import "./Notice.css";
import { ToastContainer, toast } from 'react-toastify';
axios.defaults.baseURL = "http://localhost:8070/";

function Notice() {
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [dataList, setDataList] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]);

  useEffect(() => {
    // Fetch data
    getFetchData();
    // Simulate loading for 3 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Notice/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((notice) => {
      const fullName = `${notice.title}  ${notice.date}`; // Customize this according to your data structure
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

  const handleEditModalOpen = (notice) => {
    setSelectedNotice(notice);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  // Function to open delete confirmation modal
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  // Function to close delete confirmation modal
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Notice/delete/${id}`);
      toast.success("Successfully Deleted !");
      getFetchData();
      handleDeleteModalClose(); // Close delete confirmation modal after successful deletion
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Notice/add", formData);
      toast.success("Notice Created !");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Notice/update/${formData._id}`, formData);
      toast.success("Notice Updated !");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

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
              <div className="card-title">Notices</div>
            </div>

            <ul className="table-top-head">
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
                <i className="bi bi-plus-circle"></i> Create Notice
              </button>
            </div>
          </div>
          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Notice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NoticeForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Notice Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NoticeForm
                handleSubmit={handleEditSubmit}
                initialData={selectedNotice}
              />
            </Modal.Body>
          </Modal>

          {/* Delete confirmation modal */}
          <Modal show={deleteModalOpen} onHide={handleDeleteModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this notice?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteModalClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDelete(selectedNotice._id)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="table-container">
            <SearchBar onSearch={handleSearch} />
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataList.length ? (
                  filteredDataList.map((notice) => (
                    <tr key={notice._id}>
                      <td>{notice.date}</td>
                      <td>{notice.title}</td>
                      <td className="description">{notice.description}</td>
                      <td>
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(notice)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => {
                              setSelectedNotice(notice);
                              handleDeleteModalOpen(); // Open delete confirmation modal
                            }}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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

export default Notice;
