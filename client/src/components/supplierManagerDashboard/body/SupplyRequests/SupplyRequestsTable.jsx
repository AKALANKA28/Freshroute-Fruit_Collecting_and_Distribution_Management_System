import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpinnerModal from '../../../spinner/SpinnerModal';

function SupplyRequestsTable({ supplyRequests, setSupplyRequests }) {
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [declineModalShow, setDeclineModalShow] = useState(false);

  useEffect(() => {
    // Fetch data
    fetchSupplyRequests();
    // Simulate loading for 3 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    fetchSupplyRequests();
  }, );
      
  const fetchSupplyRequests = async () => {
    try {
      const response = await axios.get("/pendingSupply");
      setSupplyRequests(response.data);
    } catch (error) {
      console.error("Error fetching supply requests:", error);
    }
  };

  const handleAcceptRequest = async () => {
    if (!selectedRequest) return;
    try {
      await axios.put(`/Prediction/accept/${selectedRequest.predictionID}`);
      await axios.post('/acceptedSupply/add', selectedRequest);
      await axios.delete(`/pendingSupply/delete/${selectedRequest._id}`); // Delete the request from pendingSupplies
      fetchSupplyRequests();
      handleCloseModal();
      toast.success("Supply Request Added");
      window.location.reload();
    } catch (error) {
      toast.error("Error accepting request:", error);
    }
  };

  const handleDeclineRequest = async () => {
    if (!selectedRequest) return;
    try {
      await axios.put(`/Prediction/decline/${selectedRequest.predictionID}`);
      await axios.post('/declinedSupply/add', selectedRequest);
      await axios.delete(`/pendingSupply/delete/${selectedRequest._id}`); // Delete the request from pendingSupplies
      fetchSupplyRequests();
      handleCloseDeclineModal();
      toast.success("Supply Request Declined");
      window.location.reload();
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  const handleShowModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };
        
  const handleCloseModal = () => {
    setSelectedRequest(null);
    setShowModal(false);
  };
        
  const handleShowDeclineModal = (request) => {
    setSelectedRequest(request);
    setDeclineModalShow(true);
  };
          
  const handleCloseDeclineModal = () => {
    setSelectedRequest(null);
    setDeclineModalShow(false);
  };

  return (
    <div className="table-container">
      <br/><br/>
      {loading ? ( // Display spinner while loading is true
        <SpinnerModal show={loading} />
      ) : (
      <table className="table datatable">
        <thead className="table-light">
          <tr>
            <th scope="col">Fruit</th>
            <th scope="col">Sub Category</th>
            <th scope="col">Quality</th>
            <th scope="col">Total Quantity(kg)</th>
            <th scope="col">Price for 1kg(Rs)</th>
            <th scope="col">Total Price(Rs)</th>
            <th scope="col">Date Can Be Given</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ marginTop: "10px" }}> {/* Adjust the marginTop value as needed */}
  {supplyRequests.length === 0 ? (
    <tr>
      <td colSpan="8" style={{ textAlign: "center" }}>No pending requests</td>
    </tr>
  ) : (
    supplyRequests.map((request) => (
      <tr key={request._id} style={{ marginBottom: "10px" }}> {/* Adjust the marginBottom value as needed */}
        <td>{request.fruit}</td>
        <td>{request.subCategory}</td>
        <td>{request.quality}</td>
        <td>{request.quantity} kg</td>
        <td>Rs. {request.price}</td>
        <td>Rs. {parseFloat((request.price * request.quantity).toFixed(2))}</td>
        <td>{request.dateCanBeGiven}</td>
        <td>
          <Button
            className="btn-action btn-approve"
            onClick={() => handleShowModal(request)}
          >
            Approve
          </Button>
          <Button
            className="btn-action btn-danger"
            onClick={() => handleShowDeclineModal(request)}
          >
            Decline
          </Button>
        </td>
      </tr>
    ))
  )}
</tbody>


      </table>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to approve this request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAcceptRequest}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={declineModalShow} onHide={handleCloseDeclineModal}>
         <Modal.Header closeButton>
           <Modal.Title>Decline Request</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           Are you sure you want to decline this request?
         </Modal.Body>
         <Modal.Footer>
           <Button variant="" onClick={handleCloseDeclineModal}>
             Cancel
           </Button>
           <Button variant="danger" onClick={handleDeclineRequest}>
             Decline
           </Button>
         </Modal.Footer>
       </Modal>

    </div>
  );
}

export default SupplyRequestsTable;
