import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeclinedSuppliesTable({ declinedSupplies }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAcceptRequest = async () => {
    if (!selectedRequest) return;
    try {
      await axios.post('/acceptedSupply/add', selectedRequest);
      // Delete the declined supply
      await axios.delete(`/declinedSupply/delete/${selectedRequest._id}`);
      
      // Update the prediction status to "Approved"
      await axios.put(`/Prediction/accept/${selectedRequest.predictionID}`);

      fetchDeclinedSupplies();
      toast.success("Supply Request Approved");
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      toast.error("Error declining request:", error);
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

  const fetchDeclinedSupplies = async () => {
    try {
      await axios.get("/declinedSupply");
    } catch (error) {
      console.error("Error fetching declined supplies:", error);
    }
  };

  return (
    <div id="main col-8">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="card-title">
                Declined Supply Requests
              </div>
            </div>
          </div>

          <div className="table-container">
          <table className="table datatable">
            <thead className="table-light">
          <tr>
            <th>Fruit</th>
            <th>Sub Category</th>
            <th>Quality</th>
            <th>Total Quantity(kg)</th>
            <th>Price for 1kg(Rs)</th>
            <th>Total Price(Rs)</th>
            <th>Date Can Be Given</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {declinedSupplies.map((request) => (
            <tr key={request._id}>
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
                </Button></td>
            </tr>
          ))}
        </tbody>
          </table>
          </div>
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
          <Button variant="approve" onClick={handleAcceptRequest}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default DeclinedSuppliesTable;