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
      <div className="card">
        <div className="card-body pb-2">
          <h5 className="card-title">
            Assigned Vehicle <span></span>
          </h5>

          <div className="vehicle-details mb-3">
            <img src={img} alt="" className="vehicle-img" />
            <div className="vehicle-content">
                <span className="text-bold"> </span>
                <span className="me-3"> </span>
                <span className="text-bold"> </span>
               
                
                <tboady style={{ fontSize: "14px", color: "black"}}>
                <tr>
                    <td>
                      <span className="text-bold me-5"> Vehicle No:</span>
                    </td>
                    <td>
                      <span className="text-bold"> Engine:</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span> CP4592</span>
                    </td>
                    <td>
                      <span> 5.2L - Diesel</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-bold me-5"> Tank Capacity:</span>
                    </td>
                    <td>
                      <span className="text-bold"> Payload:</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span> 30 Galloon</span>
                    </td>
                    <td>
                      <span> 10,000 lbs </span>
                    </td>
                  </tr>
                </tboady>
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
