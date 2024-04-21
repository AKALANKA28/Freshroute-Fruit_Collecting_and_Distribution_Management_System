import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav, Tab } from "react-bootstrap";
import '../SupplyRequests/supplyRequests.css';
import SupplierRequestsTable from "./SupplierRequestsTable";
import ApprovedSuppliersTable from "./ApprovedSuppliersTable";
import DeclinedSuppliersTable from "./DeclinedSuppliersTable";

axios.defaults.baseURL = "http://localhost:8070/";

const SupplierRequests = () => {
  const [supplierRequests, setSupplierRequests] = useState([]);
  const [approvedSuppliers, setApprovedSuppliers] = useState([]);
  const [declinedSuppliers, setDeclinedSuppliers] = useState([]);

  useEffect(() => {
    fetchSupplierRequests();
    fetchApprovedSuppliers();
    fetchDeclinedSuppliers();
  }, []);

  const fetchSupplierRequests = async () => {
    try {
      const response = await axios.get("/pendingSupplier");
      setSupplierRequests(response.data);
    } catch (error) {
      console.error("Error fetching supplier requests:", error);
    }
  };

  const fetchApprovedSuppliers = async () => {
    try {
      const response = await axios.get("/acceptedSupplier");
      setApprovedSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching approved suppliers:", error);
    }
  };

  const fetchDeclinedSuppliers = async () => {
    try {
      const response = await axios.get("/declinedSupplier");
      setDeclinedSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching declined suppliers:", error);
    }
  };






  return (
    <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
              <div className="card-title">
                Supplier Requests
                <h6>Manage Supplier Requests</h6>
              </div>
          </div>

          <Tab.Container defaultActiveKey="supplierRequests">
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="supplierRequests">Pending Supplier Requests</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="approvedSuppliers">Approved Suppliers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="declinedSuppliers">Declined Suppliers</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="supplierRequests">
                <SupplierRequestsTable
                  supplierRequests={supplierRequests}
                  fetchSupplierRequests={fetchSupplierRequests}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="approvedSuppliers">
                <ApprovedSuppliersTable approvedSuppliers={approvedSuppliers} />
              </Tab.Pane>
              <Tab.Pane eventKey="declinedSuppliers">
              <DeclinedSuppliersTable declinedSuppliers={declinedSuppliers} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

        </div>
      </div>
  );
};

export default SupplierRequests;
