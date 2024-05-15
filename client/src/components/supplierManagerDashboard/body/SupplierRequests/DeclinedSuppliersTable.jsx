import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

function DeclinedSuppliersTable({ declinedSuppliers }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAcceptRequest = async () => {
    if (!selectedRequest) return;
    try {
      await axios.post('/Farmer/add', {
        NIC: selectedRequest.NIC,
        username: "",
        name: selectedRequest.name,
        email: selectedRequest.email,
        mobile: selectedRequest.mobile,
        city: selectedRequest.city,
        lane: "",
        landAddress: selectedRequest.landAddress,
        fieldArea: selectedRequest.fieldArea,
        landDeedUrl: selectedRequest.landDeedUrl,
        joinRequestId: selectedRequest.joinRequestId
      });
      await axios.post('/acceptedSupplier/add', selectedRequest);
      // Delete the declined supplier
      await axios.delete(`/declinedSupplier/delete/${selectedRequest._id}`);
      
      // Update the prediction status to "Approved"
      await axios.put(`/JoiningRequest/accept/${selectedRequest.joinRequestId}`);
      fetchDeclinedSuppliers();
      handleCloseModal();
      toast.success("Supplier Request Approved");
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

  const fetchDeclinedSuppliers = async () => {
    try {
      await axios.get("/declinedSupplier");
    } catch (error) {
      console.error("Error fetching declined suppliers:", error);
    }
  };

  return (
    <div id="main col-8">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="card-title">
                Declined Supplier Requests
              </div>
            </div>
          </div>

          <div className="table-container">
          <table className="table datatable">
            <thead className="table-light">
          <tr>
          <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">City</th>
            {/* <th scope="col">NIC</th> */}
            <th scope="col">Land Address</th>
            <th scope="col">Field Area</th>
            <th scope="col">Land Deed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {declinedSuppliers.map((request) => (
            <tr key={request._id}>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.mobile}</td>
                <td>{request.city}</td>
                {/* <td>{request.NIC}</td> */}
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

export default DeclinedSuppliersTable;