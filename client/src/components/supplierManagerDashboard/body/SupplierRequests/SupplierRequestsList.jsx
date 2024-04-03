import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import JoinForm from './JoinForm';

const SupplierRequests = () => {
  const supplierRequests = [
    { id: 1, name: 'Supplier 1', email: 'supplier1@example.com', status: 'Pending' },
    { id: 2, name: 'Supplier 2', email: 'supplier2@example.com', status: 'Approved' },
    { id: 3, name: 'Supplier 3', email: 'supplier3@example.com', status: 'Pending' },
  ];

  const [showJoinForm, setShowJoinForm] = useState(false);

  const handleJoinClick = () => {
    setShowJoinForm(true);
  };

  const handleCloseJoinForm = () => {
    setShowJoinForm(false);
  };

  return (
    <div>
      <div className="main">
        <h1>Supplier Requests</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {supplierRequests.map(request => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleJoinClick}>Join with us</button>
        <Modal show={showJoinForm} onHide={handleCloseJoinForm} centered>
          <Modal.Header closeButton>
            <Modal.Title>Join with us</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JoinForm onClose={handleCloseJoinForm} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default SupplierRequests;
