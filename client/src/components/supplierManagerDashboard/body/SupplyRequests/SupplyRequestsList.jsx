import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import './supplyRequests.css';

axios.defaults.baseURL = "http://localhost:8070/";

function SupplyRequestsList() {
  const [supplyRequests, setSupplyRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSupplyRequests();
  }, []);

  const fetchSupplyRequests = async () => {
    try {
      const response = await axios.get("/Prediction"); // Assuming this is the endpoint to fetch supply predictions
      setSupplyRequests(response.data);
    } catch (error) {
      console.error("Error fetching supply requests:", error);
    }
  };

  const handleAcceptRequest = async () => {
    if (!selectedRequest) return;
    try {
      // Update backend to mark the prediction request as accepted
      await axios.put(`/Prediction/accept/${selectedRequest._id}`);
      
      // Store the accepted supply prediction in the "acceptedSupplies" collection
      await axios.post('/acceptedSupply/add', selectedRequest);
      
      // Refetch supply requests after accepting
      fetchSupplyRequests();
      handleCloseModal();
      alert("Supply Added");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDeclineRequest = async (id) => {
    try {
      // Update backend to mark the prediction request as declined
      await axios.put(`/Prediction/decline/${id}`); // Assuming there's an endpoint to handle declining predictions
    
      // Refetch supply requests after declining
      fetchSupplyRequests();
      handleCloseModal();
      alert("Request Declined");
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

  return (
    <div id="main col-8">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="card-title">
                Supply Requests
                <h6>Manage Supply Requests</h6>
              </div>
            </div>
          </div>

          <div className="table-container">
          <table className="table datatable">
            {/* <table className="table table-borderless datatable"> */}
              <thead className="table-light">
                <tr>
                  <th scope="col">Fruit</th>
                  <th scope="col">Sub Category</th>
                  <th scope="col">Quality</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Date Can Be Given</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {supplyRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.fruit}</td>
                  <td>{request.subCategory}</td>
                  <td>{request.quality}</td>
                  <td>{request.quantity}</td>
                  <td>{request.price}</td>
                  <td>{request.dateCanBeGiven}</td>
                  <td>
                    <Button
                      className="btn-action btn-approve"
                      variant="success"
                      onClick={() => handleShowModal(request)}
                    >
                      Approve
                    </Button>
                    <Button
                      className="btn-action btn-decline"
                      variant="danger"
                      onClick={() => handleDeclineRequest(request._id)}
                    >
                      Decline
                    </Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for accepting/declining request */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to accept/decline this request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAcceptRequest}>
            Accept
          </Button>
          <Button variant="danger" onClick={handleDeclineRequest}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SupplyRequestsList;
