import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8070/";

const NavMessage = () => {
  const [dataList, setDataList] = useState([]);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
      getMessageCount();
      getFetchData();
  }, []);

  const getMessageCount = async () => {
      try {
          const response = await axios.get("/Message/count");
          if (response && response.data) {
              setMessageCount(response.data.count);
          }
      } catch (err) {
          alert(err.message);
      }
  };

  const getFetchData = async () => {
      try {
          const response = await axios.get("/Message/");
          if (response && response.data) {
              setDataList(response.data);
          }
      } catch (err) {
          alert(err.message);
      }
  };

  return (
    <div>
       <li className='nav-item dropdown'>
        <a className='nav-link nav-icon' href='#' data-bs-toggle='dropdown'>
            <i className='bi bi-chat-left-text'>
            </i>
            <span className='badge bg-success badge-number'>{messageCount}</span>
        </a>

        <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications'>
            <li className='dropdown-header'>
                You have {messageCount} new messages
                <a href='#'>
                    <span className='badge rounded-pill bg-primary p-2 ms-2'>
                        View all
                    </span>
                </a>
            </li>
            <li><hr className='dropdown-divider'/></li>
                    
                        {dataList.length ? (
                            dataList.map((message, index) => (
                                <div key={index}>
                                    <li className='notification-item'>
                                    <i className='bi bi-exclamation-circle text-warning'></i>
                                    <div>
                                        <h4>{message.title}</h4>
                                        <p>{message.message}</p>
                                    </div>
                                    </li>
                                </div>
                            ))
                        ) : (
                            <div>No messages</div>
                        )}
                    
                    <li><hr className='dropdown-divider'/></li>
                    <li><hr className='dropdown-divider'/></li>
                    <li className='dropdown-footer'>
                        <a href='#'>Show all messages</a>
                    </li>
                </ul>
            </li>
        </div>
    );
}

export default NavMessage
