import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav, Tab } from "react-bootstrap";
import './supplyRequests.css';
import SupplyRequestsTable from "./SupplyRequestsTable";
import ApprovedSuppliesTable from "./ApprovedSuppliesTable";
import DeclinedSuppliesTable from "./DeclinedSuppliesTable";

axios.defaults.baseURL = "http://localhost:8070/";

function SupplyRequestsList() {
  const [supplyRequests, setSupplyRequests] = useState([]);
  const [approvedSupplies, setApprovedSupplies] = useState([]);
  const [declinedSupplies, setDeclinedSupplies] = useState([]);

  useEffect(() => {
    fetchSupplyRequests();
    fetchApprovedSupplies();
    fetchDeclinedSupplies();
  }, []);

  const fetchSupplyRequests = async () => {
    try {
      const response = await axios.get("/pendingSupply");
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

  return (
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
              <div className="card-title">
                Supply Requests
                <h6>Manage Supply Requests</h6>
              </div>
          </div>

          <Tab.Container defaultActiveKey="supplyRequests">
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="supplyRequests">Pending Requests</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="approvedSupplies">Approved Supplies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="declinedSupplies">Declined Supplies</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="supplyRequests">
                <SupplyRequestsTable
                  supplyRequests={supplyRequests}
                  fetchSupplyRequests={fetchSupplyRequests}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="approvedSupplies">
                <ApprovedSuppliesTable approvedSupplies={approvedSupplies} />
              </Tab.Pane>
              <Tab.Pane eventKey="declinedSupplies">
              <DeclinedSuppliesTable declinedSupplies={declinedSupplies} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

        </div>
      </div>
  );
}

export default SupplyRequestsList;
