import React, { useState, useEffect } from 'react';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8070/";

const Card = () => {
  const [totalFarmers, setTotalFarmers] = useState(0);

  useEffect(() => {
    axios.get("/Prediction/totalCount")
      .then(response => {
        setTotalFarmers(response.data.count);
      })
      .catch(error => {
        console.error("Error fetching total farmer count:", error);
      });
  }, []);

  return (
    <div className="row">
      <div className="col-xxl-5 col-6">
        <div className="card info-card sales-card">
          <div className="card-body">
            <h5 className="card-title">
              Total predictions you made
            </h5>
            <div className="d-flex align-items-center">
              <div className="ps-5 card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className="bi bi-bar-chart"></i>
              </div>
              <div className="ps-5">
                <h6 className='card-price'>
                  {totalFarmers} predictions
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
