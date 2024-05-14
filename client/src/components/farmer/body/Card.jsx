import React, { useState, useEffect } from 'react';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8070/";

const Card = () => {
  const [totalPredictions, setTotalPredictions] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    axios.get("/Prediction/totalCount")
      .then(response => {
        setTotalPredictions(response.data.count);
      })
      .catch(error => {
        console.error("Error fetching total predictions count:", error);
      });

    axios.get("/Prediction/totalEarnings")
      .then(response => {
        setTotalEarnings(response.data.totalEarnings.toFixed(2));
      })
      .catch(error => {
        console.error("Error fetching total earnings:", error);
      });
  }, []);

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-xxl-6 col-md-6">
          <div className="card info-card sales-card">
            <div className="card-body">
              <h5 className="card-title">
                Total predictions you made
              </h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-bar-chart"></i>
                </div>
                <div className="ps-5">
                  <h6 className='card-price'>
                    {totalPredictions} predictions
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xxl-6 col-md-6">
          <div className="card info-card sales-card">
            <div className="card-body">
              <h5 className="card-title">
                Total Earnings
              </h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-cash-coin"></i>
                </div>
                <div className="ps-5">
                  <h6 className='card-price'>
                    Rs. {totalEarnings}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;
