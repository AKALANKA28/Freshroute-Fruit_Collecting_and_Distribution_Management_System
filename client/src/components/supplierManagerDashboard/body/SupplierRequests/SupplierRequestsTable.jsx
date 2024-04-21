import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

function SupplierRequestsTable({ supplierRequests, setSupplierRequests }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [declineModalShow, setDeclineModalShow] = useState(false);

  useEffect(() => {
    fetchSupplierRequests();
  }, );
      
  const fetchSupplierRequests = async () => {
    try {
      const response = await axios.get("/pendingSupplier");
      setSupplierRequests(response.data);
    } catch (error) {
      console.error("Error fetching supplier requests:", error);
    }
  };

  const handleAcceptRequest = async () => {
    if (!selectedRequest) return;
    try {
      await axios.put(`/JoinRequest/accept/${selectedRequest.joinRequestID}`);
      await axios.post('/acceptedSupplier/add', selectedRequest);
      await axios.delete(`/pendingSupplier/delete/${selectedRequest._id}`);
      fetchSupplierRequests();
      handleCloseModal();
      alert("Supplier Request Added");
      window.location.reload();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDeclineRequest = async () => {
    if (!selectedRequest) return;
    try {
      await axios.put(`/Prediction/decline/${selectedRequest.predictionID}`);
      await axios.post('/declinedSupply/add', selectedRequest);
      await axios.delete(`/pendingSupply/delete/${selectedRequest._id}`);
      fetchSupplierRequests();
      handleCloseDeclineModal();
      alert("Supplier Request Declined");
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
      <table className="table datatable">
        <thead className="table-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">City</th>
            <th scope="col">NIC</th>
            <th scope="col">Land Address</th>
            <th scope="col">Field Area</th>
            <th scope="col">Land Deed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ marginTop: "10px" }}> {/* Adjust the marginTop value as needed */}
  {supplierRequests.length === 0 ? (
    <tr>
      <td colSpan="8" style={{ textAlign: "center" }}>No pending requests</td>
    </tr>
  ) : (
    supplierRequests.map((request) => (
      <tr key={request._id} style={{ marginBottom: "10px" }}> {/* Adjust the marginBottom value as needed */}
        <td>{request.name}</td>
        <td>{request.email}</td>
        <td>{request.mobile}</td>
        <td>{request.city}</td>
        <td>{request.NIC}</td>
        <td>{request.landAddress}</td>
        <td>{request.fieldArea}</td>
        <td>{request.landDeedUrl && (
          <a href={request.landDeedUrl} target="_blank" rel="noopener noreferrer">
            View Land Deed
          </a>
        )}</td>
        
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

export default SupplierRequestsTable;
