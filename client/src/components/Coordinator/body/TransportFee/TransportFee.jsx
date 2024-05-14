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
import TransportFeeForm from "./TransportFeeForm";
import TransportFeeReport from "./TransportFeeReport";
import SpinnerModal from '../../../spinner/SpinnerModal'
import { ToastContainer, toast } from 'react-toastify';
import "./TransportFee.css";

axios.defaults.baseURL = "http://localhost:8070/";

function TransportFee() {
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedTransportFee, setSelectedTransportFee] = useState(null);
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
    setFilteredDataList(dataList); 
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/TransportFee/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((transportfee) => {
      const fullName = `${transportfee.vehicle_no} ${transportfee.type} ${transportfee.price} ${transportfee.capacity}  ${transportfee.conditions}`; // Customize this according to data structure
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDataList(filteredList);
  };

  const generateExcelFile = () => {
    
    const rearrangedDataList = dataList.map(category => ({
      
      Vehicle_no: category.vehicle_no,
      Type: category.type,
      Conditions: category.conditions,
      Capacity: category.capacity,
      Price: category.price,
      
    }));
  
    // Define the worksheet
    const ws = XLSX.utils.json_to_sheet(rearrangedDataList);
    
    // Define the workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transport Fee Report");
    
    // Generate the Excel file
    writeFile(wb, "transport_fee_report.xlsx");
  };

  const handleRefreshClick = () => {
    getFetchData();
    
  };

  const handleButtonClick = () => {
    getFetchData();
    generateExcelFile();
  };



  const handleEditModalOpen = (transportFee) => {
    setSelectedTransportFee(transportFee);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };




  const handleEditSubmit = async (formData) => {
    try {
      await axios.patch(`http://localhost:8070/vehicle/update/${formData._id}`, formData);
      toast.success("Transport Fee Added !")
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
            <div class="add-item d-flex">
              <div class="card-title">
              Transport Fee Details
                <h6>Manage Transport Fees</h6>
              </div>
            </div>
            <ul class="table-top-head">
            <li>
              <BlobProvider
                  document={<TransportFeeReport dataList={dataList}/>}
                  fileName="TransportFeeReport.pdf"
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
           
          </div>

          

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Transport Fee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TransportFeeForm
                handleSubmit={handleEditSubmit}
                initialData={selectedTransportFee}
              />
            </Modal.Body>
          </Modal>
      <div className="table-container">
      <SearchBar onSearch={handleSearch} />
      <br/>
        <table className="table table-borderless datatable">
          <thead className="table-light">
            <tr>
            
            <th scope="col">Vehicle No</th>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Conditions</th>
              <th scope="col">Capacity</th>
              <th scope="col">Price per km</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredDataList.length ? (
                  filteredDataList.map((transportfee) => (
                <tr key={transportfee._id}>
                 
                 <td>{transportfee.vehicle_no}</td>
                  <td>{transportfee.type}</td>
                  <td>{transportfee.conditions}</td>
                  <td>{transportfee.capacity}</td>
                  <td>{transportfee.price ? `Rs.${transportfee.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}</td>

                  <td className="actionSize" >
                    <div className="buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditModalOpen(transportfee)}
                      >
                        <i className="bi bi-calculator"></i>
                      </button>
                      
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Data</td>
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

export default TransportFee;
