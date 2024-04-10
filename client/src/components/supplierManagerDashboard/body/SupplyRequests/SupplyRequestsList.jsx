import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import './supplyRequests.css';
import ApprovedSuppliesTable from "./ApprovedSuppliesTable";
import DeclinedSupplies from "./DeclinedSuppliesTable";

axios.defaults.baseURL = "http://localhost:8070/";

function SupplyRequestsList() {
  const [supplyRequests, setSupplyRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [declineModalShow, setDeclineModalShow] = useState(false);
  const [approvedSupplies, setApprovedSupplies] = useState([]);
  const [declinedSupplies, setDeclinedSupplies] = useState([]);

  useEffect(() => {
    fetchSupplyRequests();
    fetchApprovedSupplies();
    fetchDeclinedSupplies();
  }, []);

  const fetchSupplyRequests = async () => {
    try {
      const response = await axios.get("/Prediction");
      setSupplyRequests(response.data);
    } catch (error) {
      console.error("Error fetching supply requests:", error);
    }
  };

  const fetchApprovedSupplies = async () => {
    try {
      const response = await axios.get("/acceptedSupply");
      setApprovedSupplies(response.data);
    } catch (error) {
      console.error("Error fetching approved supplies:", error);
    }
  };

  const fetchDeclinedSupplies = async () => {
    try {
      const response = await axios.get("/declinedSupply");
      setDeclinedSupplies(response.data);
    } catch (error) {
      console.error("Error fetching declined supplies:", error);
    }
  };

  const handleAcceptRequest = async () => {
    if (!selectedRequest) return;
    try {
      await axios.put(`/Prediction/accept/${selectedRequest._id}`);
      await axios.post('/acceptedSupply/add', selectedRequest);
      fetchSupplyRequests();
      handleCloseModal();
      alert("Supply Added");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDeclineRequest = async () => {
    if (!selectedRequest) return;
    try {
      await axios.put(`/Prediction/decline/${selectedRequest._id}`);
      await axios.post('/declinedSupply/add', selectedRequest);
      fetchSupplyRequests();
      handleCloseDeclineModal();
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

  const handleShowDeclineModal = (request) => {
    setSelectedRequest(request);
    setDeclineModalShow(true);
  };
  
  const handleCloseDeclineModal = () => {
    setSelectedRequest(null);
    setDeclineModalShow(false);
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
              <tbody>
              {supplyRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.fruit}</td>
                  <td>{request.subCategory}</td>
                  <td>{request.quality}</td>
                  <td>{request.quantity}</td>
                  <td>{request.price}</td>
                  <td>{request.price * request.quantity}</td>
                  <td>{request.dateCanBeGiven}</td>
                  <td>
                    <Button
                      className="btn-action btn-approve"
                      variant="success"
                      onClick={() => handleShowModal(request)}
                    >
                      Approve
                    </Button>
                    <button
                      className="btn btn-action btn-danger"
                      onClick={() => handleShowDeclineModal(request)}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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

      <ApprovedSuppliesTable approvedSupplies={approvedSupplies} setApprovedSupplies={setApprovedSupplies} />
      <DeclinedSupplies declinedSupplies={declinedSupplies} />
    </div>
  );
}

export default SupplyRequestsList;