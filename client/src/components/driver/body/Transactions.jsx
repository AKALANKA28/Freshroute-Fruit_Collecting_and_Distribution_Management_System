import React, { useEffect, useState } from "react";
import CardFilter from "./CardFilter";
import NewsPostItem from "./TransactionsPostItem";
import img from "../../../assests/truck.png";

import "./main.css";
const Transactions = () => {
  const [news, setNews] = useState([]);


  const fetchData = () => {
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="card transaction-card">
        <div className="card-body pb-0">
          <h5 className="card-title">
            Assigned Vehicle <span></span>
          </h5>

          <div className="vehicle-details">
            <img src={img} alt="" className="vehicle-img" />
            <div className="vehicle-content">
              <p className="" style={{ fontSize: "14px", color: "black" }}>
               <span className="text-bold"> Vehicle No:</span><span className="me-3"> CP4592</span>
                <span className="text-bold"> Engine:</span><span> 5.2L - Diesel</span>
                <span className="text-bold"> Transmission:</span><span> Automatic Transmision</span>  <br/>
                <span className="text-bold"> Tank Capacity:</span><span> 30 Galloon</span>  <br/> 
                <span className="text-bold"> Payload:</span><span> 10,000 lbs </span>

               </p>
              <p className="" style={{ fontSize: "14px", color: "black" }}>
             
              </p>
            </div>
          </div>

          {/* <div className='news'>
            {
                news &&
                news.length > 0 &&
                news.map(item => <NewsPostItem key={item._id} item={item}/>)
            }
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
