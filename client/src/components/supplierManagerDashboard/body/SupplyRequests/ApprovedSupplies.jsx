import React, { useEffect, useState } from "react";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8070/";

function ApprovedSupplies({ approvedSupplies, setApprovedSupplies }) {

  const [supplyRequests, setSupplyRequests] = useState([]);

  useEffect(() => {
    fetchSupplyRequests();
  }, []);

  const fetchSupplyRequests = async () => {
    try {
      const response = await axios.get("/Prediction");
      setSupplyRequests(response.data);
    } catch (error) {
      console.error("Error fetching supply requests:", error);
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
                  <th>Quantity</th>
                  <th>Price for 1kg</th>
                  <th>Total Price</th>
                  <th>Date Can Be Given</th>
                </tr>
              </thead>
              <tbody>
                {approvedSupplies.map((request) => (
                  <tr key={request._id}>
                    <td>{request.fruit}</td>
                    <td>{request.subCategory}</td>
                    <td>{request.quality}</td>
                    <td>{request.quantity}</td>
                    <td>{request.price}</td>
                    <td>{request.price * request.quantity}</td>
                    <td>{request.dateCanBeGiven}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovedSupplies;
