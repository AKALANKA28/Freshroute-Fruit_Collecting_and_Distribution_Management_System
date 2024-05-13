import React, { useState, useEffect } from "react";
import "./count.css";
import offer from "../../assets/offer.jpeg";

const Count = () => {
  // State to store the remaining time
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Calculate time left until the offer ends
  function calculateTimeLeft() {
    const offerEndDate = new Date("2024-05-31"); // Adjust the end date accordingly
    const now = new Date();
    const difference = offerEndDate - now;
    
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Update the time left every second
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearTimeout(timer);
  });

  return (
    <div className="offersection section--no-pt section--no-pb section--gutter">
      <div className="container-fluid px-md-0">
        <div className="row gx-0">
          <div className="col-md-6">
            <img
              className="img-fluid w-100 lazy loaded"
              src={offer}
              alt="demo"
              data-was-processed="true"
            />
          </div>
          <div className="col-md-6 offerCol">
            <div className="offerContent d-flex align-items-center justify-content-center">
              <div className="white-rectangle d-flex flex-column align-items-center justify-content-flex-start">
                <h6 className="heading">Special Offers</h6>
                <p className="subheading">
                  get <span>30%</span> off
                </p>
                <p className="_text">If You Order Rs. 20 000 Or More</p>
                <div className="d-flex align-items-center justify-content-between gap-4 mt-5 _textCount">
                  <div className="rec1 d-flex align-items-center justify-content-center">
                    <div className="black-rectangle d-flex align-items-center justify-content-center fw-bold">
                      {timeLeft.days}
                    </div>
                  </div>
                  <div className="black-rectangle d-flex align-items-center justify-content-center fw-bold">
                    {timeLeft.hours}
                  </div>
                  <div className="black-rectangle d-flex align-items-center justify-content-center fw-bold">
                    {timeLeft.minutes}
                  </div>
                  <div className="black-rectangle d-flex align-items-center justify-content-center fw-bold">
                    {timeLeft.seconds}
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-5 mt-1 align-content-center" style={{ fontSize: "14px" }}>
                  <div>
                    <span> Days</span>
                  </div>
                  <div>
                    <span> Hours</span>
                  </div>
                  <div>
                    <span> Minutes</span>
                  </div>
                  <div>
                    <span>Sec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Count;
