import React, { useState, useEffect } from 'react';
import axios from "axios";
import './main.css'

axios.defaults.baseURL = "http://localhost:8070/";

const Card = () => {
  const [totalFarmers, setTotalFarmers] = useState(0);
  const [totalPendingSupplies, setTotalPendingSupplies] = useState(0);
  const [totalApprovedSupplies, setTotalApprovedSupplies] = useState(0);
  const [totalDeclinedSupplies, setTotalDeclinedSupplies] = useState(0);

  useEffect(() => {
    axios.get("/Farmer/totalCount")
      .then(response => {
        setTotalFarmers(response.data.count);
      })
      .catch(error => {
        console.error("Error fetching total farmer count:", error);
      });

    axios.get("/pendingSupply/totalPendingSupplies")
      .then(response => {
        setTotalPendingSupplies(response.data.count);
      })
      .catch(error => {
        console.error("Error fetching total approved price:", error);
      });

      axios.get("/acceptedSupply/totalApprovedSupplies")
      .then(response => {
        setTotalApprovedSupplies(response.data.count);
      })
      .catch(error => {
        console.error("Error fetching total approved price:", error);
      });  
      
      axios.get("/declinedSupply/totalDeclinedSupplies")
      .then(response => {
        setTotalDeclinedSupplies(response.data.count);
      })
      .catch(error => {
        console.error("Error fetching total approved price:", error);
      }); 

  }, []);

  return (
    <div className="row">
      <div className="col-xxl-4 col-6">
        <div className="card info-card sales-card">
          <div className="card-body">
            <h5 className="card-title">
              Total Suppliers
            </h5>
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-users"></i>
              </div>
              <div className="ps-5">
                <h6 className='card-price'>
                  {totalFarmers} <span className="status-label">Suppliers</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-8 col-6">
        <div className="card info-card sales-card">
          <div className="card-body">
            <h5 className="card-title">
              Details of Supply Requests
            </h5>
            <div className="d-flex align-items-center row">
              
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className="fas fa-clipboard-list pending"></i>
              </div>
              <div className="col">
                <h6 className='card-price supply-status'>
                <a href='/SupplyRequests' className="link">{totalPendingSupplies} <span className="status-label">Pending</span></a>
                </h6>
              </div>

              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className="fas fa-check-circle"></i>
              </div>
              <div className="col">
                <h6 className='card-price supply-status'>
                <a href='/ApprovedSupplies' className="link">{totalApprovedSupplies} <span className="status-label">Approved</span></a>
                </h6>
              </div>

              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center ">
              <i className="fas fa-times-circle declined"></i>
              </div>
              <div className="col">
                <h6 className='card-price supply-status'>
                <a href='/DeclinedSupplies' className="link">{totalDeclinedSupplies} <span className="status-label">Declined</span></a>
                </h6>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
