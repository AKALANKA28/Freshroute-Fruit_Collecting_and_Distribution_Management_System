import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

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
      await axios.put(`/JoiningRequest/decline/${selectedRequest.joinRequestId}`);
      await axios.delete(`/Farmer/deleteFarmerByJoinRequestID/${selectedRequest.joinRequestId}`);
      fetchApprovedSupplies();
      handleCloseDeclineModal();
      toast.success("Supplier Request Declined");
      window.location.reload();
    } catch (error) {
      toast.error("Error declining request:", error);
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
      await axios.get("/acceptedSupplier");
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
                {approvedSuppliers.map((request) => (
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
