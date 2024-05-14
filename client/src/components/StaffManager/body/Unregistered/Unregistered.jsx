import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { BlobProvider, } from "@react-pdf/renderer";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import UnregisteredForm from "./UnregisteredForm";
import UnregisteredReport from "./UnregisteredReport";
import SpinnerModal from '../../../spinner/SpinnerModal'
import "./Unregistered.css";
import { ToastContainer, toast } from 'react-toastify';
axios.defaults.baseURL = "http://localhost:8070/";

function Unregistered() {
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [unregisteredToDelete, setUnregisteredToDelete] = useState(null);

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
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Unregistered/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((unregistered) => {
      const fullName = `${unregistered.name} ${unregistered.jobrole} ${unregistered.address} ${unregistered.nic} ${unregistered.email} ${unregistered.accno} ${unregistered.bankname} ${unregistered.joineddate}`; // Customize this according to your data structure
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDataList(filteredList);
  };

  const handleRefreshClick = () => {
    getFetchData();
  };

  const handleDeleteModalOpen = (unregisteredId) => {
    setUnregisteredToDelete(unregisteredId);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/Unregistered/delete/${unregisteredToDelete}`);
      toast.success("Successfully Deleted");
      getFetchData();
      handleDeleteModalClose();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleConfirm = async (unregistered) => {
    try {
      // Move data to Employee table
      await axios.post("/Employee/add", unregistered);
      // Delete the unregistered user
      await axios.delete(`/Unregistered/delete/${unregistered._id}`);
      toast.success("Confirmed the employee registration");
      getFetchData(); // Refresh the data list
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div id='main' className='main'>
      <br/><br/>
      {loading ? (
        <SpinnerModal show={loading} />
      ) : (
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <div className="page-header">
              <div className="add-item d-flex">
                <div className="card-title">
                  Unregistered User Details
                  <h6>Manage unregistered user details</h6>
                </div>
              </div>

              <ul className="table-top-head">
              <li>
              <BlobProvider
                  document={<UnregisteredReport dataList={dataList}/>}
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
                    <a href="#" onClick={handleRefreshClick}>
                      <img src={Refresh} alt="Refresh Icon" className="icon" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <Modal show={deleteModalOpen} onHide={handleDeleteModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this Unregistered User?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteModalClose}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirmed}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="table-container">
              <SearchBar onSearch={handleSearch} />

              <table className="table table-borderless datatable">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Job Role</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email Address</th>
                    <th scope="col"> Account Number</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Qualifications</th>
                    <th scope="col">Submitedd Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDataList.length ? (
                    filteredDataList.map((unregistered) => (
                      <tr key={unregistered._id}>
                        <td>
                          {unregistered.imageUrl && (
                            <img
                              src={unregistered.imageUrl}
                              alt="Employee Profile"
                              className="rounded-circle"
                              style={{ width: "50px", height: "50px" }}
                            />
                          )}
                        </td>
                        <td>{unregistered.name}</td>
                        <td>{unregistered.jobrole}</td>
                        <td>{unregistered.nic}</td>
                        <td>{unregistered.address}</td>
                        <td>{unregistered.email}</td>
                        <td>{unregistered.accno}</td>
                        <td>{unregistered.bankname}</td>
                        <td>
                          {unregistered.fileUrl && (
                            <a href={unregistered.fileUrl} target="_blank" rel="noopener noreferrer">
                              View Qualifications
                            </a>
                          )}
                        </td>
                        <td>{unregistered.joineddate}</td>
                        <td>
                          <div className="buttons">
                            <button
                              className="btn btn-confirm"
                              onClick={() => handleConfirm(unregistered)}
                            >
                              Confirm
                            </button>
                            <button
                              className="btn btn-delete"
                              onClick={() => handleDeleteModalOpen(unregistered._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10">No Data</td>
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

export default Unregistered;
