import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const ApprovedSuppliersTable = ({ approvedSuppliers }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [declineModalShow, setDeclineModalShow] = useState(false);

  const handleDeclineRequest = async () => {
    if (!selectedRequest) return;
    try {
      await axios.post('/declinedSupplier/add', selectedRequest);
      // Delete the accepted supply
      await axios.delete(`/acceptedSupplier/delete/${selectedRequest._id}`);

      // Update the prediction status to "Declined"
      await axios.put(`/JoiningRequest/decline/${selectedRequest.predictionID}`);

      fetchApprovedSupplies();
      handleCloseDeclineModal();
      alert("Supply Request Declined");
      window.location.reload();
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  const handleShowDeclineModal = (request) => {
    setSelectedRequest(request);
    setDeclineModalShow(true);
  };
          
  const handleCloseDeclineModal = () => {
    setSelectedRequest(null);
    setDeclineModalShow(false);
  };

  const fetchApprovedSupplies = async () => {
    try {
      await axios.get("/acceptedSupply");
    } catch (error) {
      console.error("Error fetching approved supplies:", error);
    }
  };

  return (
    <div id="main col-8">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="card-title">
                Approved Supply Requests
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
                {approvedSuppliers.map((request) => (
                  <tr key={request._id}>
                    <td>{request.fruit}</td>
                    <td>{request.subCategory}</td>
                    <td>{request.quality}</td>
                    <td>{request.quantity} kg</td>
                    <td>Rs. {request.price}</td>
                    <td>Rs. {request.price * request.quantity}</td>
                    <td>{request.dateCanBeGiven}</td>
                    <td>
                      <Button
                        className="btn btn-action btn-danger"
                        onClick={() => handleShowDeclineModal(request)}
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
};

export default ApprovedSuppliersTable;
