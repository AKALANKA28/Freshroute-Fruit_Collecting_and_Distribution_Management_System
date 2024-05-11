import React, { useEffect, useState } from "react";
import axios from "axios";
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from './SearchBar';
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import PredictionForm from "./PredictionForm";
import PredictionReport from "./PredictionReport";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpinnerModal from '../../../spinner/SpinnerModal';
import './predictions.css';

axios.defaults.baseURL = "http://localhost:8070/";

function PredictionsList() {
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]); 
  const [searchAttribute, setSearchAttribute] = useState('fruit'); // Initialize with 'fruit'
  const [declineModalShow, setDeclineModalShow] = useState(false); 

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
    getFetchData();
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Prediction/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const generateExcelFile = () => {
    // Rearrange the order of properties for each prediction object
    const rearrangedDataList = dataList.map(prediction => ({
      fruit: prediction.fruit,
      subCategory: prediction.subCategory,
      quality: prediction.quality,
      quantity: prediction.quantity,
      price: prediction.price,
      dateCanBeGiven: prediction.dateCanBeGiven
    }));
  
    // Define the worksheet
    const ws = XLSX.utils.json_to_sheet(rearrangedDataList);
    
    // Define the workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Predictions Report");
    
    // Generate the Excel file
    writeFile(wb, "predictions_report.xlsx");
  };
  
  const handleButtonClick = () => {
    getFetchData(); // Fetch the latest data if needed
    generateExcelFile();
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (prediction) => {
    setSelectedPrediction(prediction);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedPrediction) return;
    try {
        await axios.delete(`/Prediction/delete/${selectedPrediction._id}`);
        await axios.delete(`/pendingSupply/deleteByPredictionID/${selectedPrediction._id}`);
        getFetchData();
        toast.success("Successfully Deleted");
        handleCloseDeclineModal();
      } catch (err) {
        alert(err.message);
      }
  };

  const handleShowDeclineModal = (prediction) => {
    setSelectedPrediction(prediction);
    setDeclineModalShow(true);
  };
          
  const handleCloseDeclineModal = () => {
    setSelectedPrediction(null);
    setDeclineModalShow(false);
  };

  const handleAddSubmit = async (formData) => {
    try {
      // Add supply prediction to the Prediction collection
      const response = await axios.post("/Prediction/add", formData);
      const predictionId = response.data._id;
  
      // Create payload to add supply prediction to the pendingSupplies collection
      const pendingSupplyData = {
        ...formData,
        predictionID: predictionId
      };
  
      // Add supply prediction to the pendingSupplies collection
      await axios.post("/pendingSupply/add", pendingSupplyData);
  
      handleAddModalClose();
      getFetchData();
      toast.success("Supply Prediction Added");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Prediction/update/${formData._id}`, formData);
      handleEditModalClose();
      getFetchData();
      toast.success("Prediction Updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((prediction) => {
      // Check the selected search attribute and filter accordingly
      switch (searchAttribute) {
        case 'fruit':
          const fruit = `${prediction.fruit} ${prediction.subCategory}`;
          return fruit.toLowerCase().includes(query.toLowerCase());
        case 'quality':
          return prediction.quality.toLowerCase().includes(query.toLowerCase());
        default:
          return false;
      }
    });
    setFilteredDataList(filteredList);
  };

  // Function to handle search attribute change
  const handleSearchAttributeChange = (event) => {
    setSearchAttribute(event.target.value);
  };

  // Helper function to format status text
const formatStatus = (status) => {
  switch (status) {
    case 'approved':
      return 'Approved';
    case 'declined':
      return 'Declined';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
};

// Helper function to get the CSS class name based on status
const getStatusClassName = (status) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'approved';
    case 'declined':
      return 'declined';
    case 'pending':
      return 'pending';
    default:
      return '';
  }
};

  const [showReportModal, setShowReportModal] = useState(false);
  const handleCloseReportModal = () => setShowReportModal(false);
  const handleShowReportModal = () => setShowReportModal(true);

  return (
    <div  id="main col-8">
       <br/><br/>
      {loading ? ( // Display spinner while loading is true
        <SpinnerModal show={loading} />
      ) : (
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div class="add-item d-flex">
              <div class="card-title">
              Prediction Details
                <h6>Manage Prediction Details</h6>
              </div>
            </div>
            <ul class="table-top-head" style={{ float: "right" }}>
              <li>
              <BlobProvider
                  document={<PredictionReport dataList={dataList}/>}
                  fileName="PredictionReport.pdf"
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
                  <a onClick={handleButtonClick}>
                    <img src={Excel} alt="Excel Icon" className="icon" />
                  </a>
                </div>
              </li>
              <li>
                <div className="button-container">
                  <a onClick={handleRefreshClick}>
                    <img src={Refresh} alt="Refresh Icon" className="icon" />
                  </a>
                </div>
              </li>
              <li>
                <div class="page-btn">
                  <button
                    type="button"
                    className="btn btn-added"
                    onClick={handleAddModalOpen}
                  >
                    <i className="bi bi-plus-circle"></i> Add Supply Prediction
                  </button>
                </div>
              </li>
            </ul>
            <Modal show={showReportModal} onHide={handleCloseReportModal}>
              <Modal.Header closeButton>
                <Modal.Title>Prediction Details Report</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PDFViewer width="100%" height="500px">
                  <PredictionReport dataList={dataList} />
                </PDFViewer>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseReportModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Supply Prediction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PredictionForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Supply Prediction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PredictionForm
                handleSubmit={handleEditSubmit}
                initialData={selectedPrediction}
              />
            </Modal.Body>
          </Modal>

          <div className="table-container">
            <SearchBar
              onSearch={handleSearch}
              searchAttribute={searchAttribute}
              onSearchAttributeChange={handleSearchAttributeChange}
            />
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Fruit</th>
                  <th scope="col">Sub Category</th>
                  <th scope="col">Quality</th>
                  <th scope="col">Total Quantity(kg)</th>
                  <th scope="col">Price for 1kg</th>
                  <th scope="col">Total Price(Rs)</th>
                  <th scope="col">Date Can Be Given</th>
                  <th scope="col">Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {filteredDataList.length ? (
                filteredDataList.map((prediction, index) => (
                  <tr key={prediction._id}>
                    <td>{index + 1}</td>
                    <td>{prediction.fruit}</td>
                    <td>{prediction.subCategory}</td>
                    <td>{prediction.quality}</td>
                    <td>{prediction.quantity} kg</td>
                    <td>Rs. {prediction.price}</td>
                    <td>Rs. {parseFloat((prediction.price * prediction.quantity).toFixed(2))}</td>
                    <td>{prediction.dateCanBeGiven}</td>
                    <td>
                      <div
                        className={`status-box ${getStatusClassName(prediction.status)}`}
                      >
                        {formatStatus(prediction.status)}
                      </div>
                    </td>
                    <td className="action">
                    <div className="buttons">
                        
                        <button
                          className={`btn btn-edit ${["Approved", "Declined"].includes(prediction.status) ? "invisible" : ""}`}
                          onClick={() => handleEditModalOpen(prediction)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        
                        <button
                          className="btn btn-delete"
                          onClick={() => handleShowDeclineModal(prediction)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Data</td>
                </tr>
              )}

              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}
      <Modal show={declineModalShow} onHide={handleCloseDeclineModal}>
         <Modal.Header closeButton>
           <Modal.Title>Delete Prediction</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           Are you sure you want to Delete the supply prediction?
         </Modal.Body>
         <Modal.Footer>
           <Button variant="" onClick={handleCloseDeclineModal}>
             Cancel
           </Button>
           <Button variant="danger" onClick={handleDelete}>
             Delete
           </Button>
         </Modal.Footer>
       </Modal>

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

export default PredictionsList;