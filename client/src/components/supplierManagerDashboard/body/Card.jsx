import React, { useState, useEffect } from 'react';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8070/";

const Card = () => {
  const [totalFarmers, setTotalFarmers] = useState(0);
  const [totalApprovedPrice, setTotalApprovedPrice] = useState(0);

  useEffect(() => {
    axios.get("/Farmer/totalCount")
      .then(response => {
        setTotalFarmers(response.data.count);
      })
      .catch(error => {
        console.error("Error fetching total farmer count:", error);
      });

    axios.get("/acceptedSupply/totalApprovedPrice")
      .then(response => {
        setTotalApprovedPrice(response.data.totalApprovedPrice);
      })
      .catch(error => {
        console.error("Error fetching total approved price:", error);
      });
  }, []);

  return (
    <div className="row">
      <div className="col-xxl-5 col-6">
        <div className="card info-card sales-card">
          <div className="card-body">
            <h5 className="card-title">
              Total Suppliers
            </h5>
            <div className="d-flex align-items-center">
              <div className="ps-5 card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-users"></i>
              </div>
              <div className="ps-5">
                <h6 className='card-price'>
                  {totalFarmers} Farmers
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-5 col-6">
        <div className="card info-card sales-card">
          <div className="card-body">
            <h5 className="card-title">
              Total Approved Price
            </h5>
            <div className="d-flex align-items-center">
              <div className="ps-5 card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-money"></i>
              </div>
              <div className="ps-5">
                <h6 className='card-price'>
                  {totalApprovedPrice}
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
