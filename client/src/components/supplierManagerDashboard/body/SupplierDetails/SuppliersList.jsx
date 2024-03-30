import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import SupplierReport from "./SupplierReport";
import AddFarmerModal from "./AddFarmerModal";
import FarmerForm from "./FarmerForm";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './farmers.css';

import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";

axios.defaults.baseURL = "http://localhost:8070/";

function SuppliersList() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [addSection, setAddSection] = useState(false);
  const [data, setData] = useState({
    NIC: "",
    username: "",
    name: "",
    email: "",
    city: "",
    lane: "",
  });
  const [dataEdit, setDataEdit] = useState({
    _id: "",
    NIC: "",
    username: "",
    name: "",
    email: "",
    city: "",
    lane: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/Farmer/");
      setDataList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/Farmer/add", data);
      alert("Farmer Added");
      window.location.reload();
      setAddSection(false);
      setData({
        NIC: "",
        username: "",
        name: "",
        email: "",
        city: "",
        lane: "",
      });
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Failed to add farmer. Please try again.");
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (farmer) => {
    setDataEdit(farmer);
    setEditSection(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/Farmer/update/${dataEdit._id}`, dataEdit);
      alert("Farmer Updated");
      window.location.reload();
      setEditSection(false);
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Failed to update farmer. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Farmer/delete/${id}`);
      alert("Farmer Deleted");
      window.location.reload();
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Failed to delete farmer. Please try again.");
    }
  };

  const [showReportModal, setShowReportModal] = useState(false);

  const handleCloseReportModal = () => setShowReportModal(false);
  const handleShowReportModal = () => setShowReportModal(true);
  const handleRefreshClick = () => {
    fetchData();
  };

  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <>
    <ul class="table-top-head">
      <li>
      <div className="button-container">
        <a onClick={handleShowReportModal}>
          <img src={Pdf} alt="PDF Icon"  className="icon"  />
        </a>

        <Modal show={showReportModal} onHide={handleCloseReportModal}>
          <Modal.Header closeButton>
            <Modal.Title>Supplier Details Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PDFViewer width="100%" height="500px">
              <SupplierReport dataList={dataList} />
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


    {/* --------------------add button------------------ */}



      <div class="page-btn">
        <button 
          type="button" 
          class="btn btn-added" 
          data-bs-toggle="modal"  
          data-bs-target="#exampleModal" 
          onClick={() => setAddSection(true)}
        >
          <i className="bi bi-plus-circle" style={{ marginRight: '10px' }}></i>
            Add Farmer
        </button>
      </div>

      {/* <div id="main col-8" className="text-center">
        <button
          type="button"
          className="btn btn-add"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => setAddSection(true)}
        >
          <i className="bi bi-plus-circle"></i> Add Farmer
        </button>
      </div> */}
      <AddFarmerModal
        show={addSection}
        handleClose={() => setAddSection(false)}
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        rest={data}
      />
      {editSection && (
        <FarmerForm
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          rest={dataEdit}
        />
      )}
      <div id="main col-8">
        <table className="table table-borderless datatable">
          <thead className="table-light">
            <tr>
              <th scope="col">NIC</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th scope="col">Lane</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : dataList.length ? (
              dataList.map((farmer) => (
                <tr key={farmer._id}>
                  <td>{farmer.NIC}</td>
                  <td>{farmer.username}</td>
                  <td>{farmer.name}</td>
                  <td>{farmer.email}</td>
                  <td>{farmer.city}</td>
                  <td>{farmer.lane}</td>
                  <td>
                    <div className="buttons">
                      <button className="btn-table edit" onClick={() => handleEdit(farmer)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      
     
                      <button className="btn-table delete" onClick={() => handleDelete(farmer._id)}>
                        <i className="bi bi-trash3-fill"></i>
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
    </>
  );
}

export default SuppliersList;
