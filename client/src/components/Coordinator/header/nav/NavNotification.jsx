import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8070/";

const NavNotification = () => {
    const [dataList, setDataList] = useState([]);
    const [noticeCount, setNoticeCount] = useState(0);

    useEffect(() => {
        getNoticeCount();
        getFetchData();
    }, []);

    const getNoticeCount = async () => {
        try {
            const response = await axios.get("/Notice/count");
            if (response && response.data) {
                setNoticeCount(response.data.count);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const getFetchData = async () => {
        try {
            const response = await axios.get("/Notice/");
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
                    <i className='bi bi-bell'></i>
                    <span className='badge bg-primary badge-number'>{noticeCount}</span>
                </a>

                <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications'>
                    <li className='dropdown-header'>
                        You have {noticeCount} new notifications
                        <a href='#'>
                            <span className='badge rounded-pill bg-primary p-2 ms-2'>
                                View all
                            </span>
                        </a>
                    </li>
                    <li><hr className='dropdown-divider'/></li>
                    
                        {dataList.length ? (
                            dataList.map((notice, index) => (
                                <div key={index}>
                                    <li className='notification-item'>
                                    <i className='bi bi-exclamation-circle text-primary'></i>
                                    <div>
                                        <h4>{notice.title}</h4>
                                        <p>{notice.description}</p>
                                    </div>
                                    </li>
                                </div>
                            ))
                        ) : (
                            <div>No notifications</div>
                        )}
                    
                    <li><hr className='dropdown-divider'/></li>
                    <li><hr className='dropdown-divider'/></li>
                    <li className='dropdown-footer'>
                        <a href='#'>Show all notifications</a>
                    </li>
                </ul>
            </li>
        </div>
    );
}

export default NavNotification;




// import React from 'react'

// const NavNotification = () => {
//   return (
//     <div>
//       <li className='nav-item dropdown'>
//         <a className='nav-link nav-icon' href='#' data-bs-toggle='dropdown'>
//             <i className='bi bi-bell'>
//             </i>
//             <span className='badge bg-primary badge-number'>4</span>
//         </a>

//         <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications'>
//             <li className='dropdown-header'>
//                 You have 4 new notifications
//                 <a href='#'>
//                     <span className='badge rounded-pill bg-primary p-2 ms-2'>
//                         View all
//                     </span>
//                 </a>
//             </li>
//             <li>
//                 <hr className='dropdown-divider'/>
//             </li>

//             <li className='notification-item'>
//                 <i className='bi bi-exclamation-circle text-warning'></i>
//                 <div>
//                     <h4>Lorem Ipsum</h4>
//                     <p>hjhjk hjkhjkh hjkhjkdc casyhjdgqw ghg</p>
//                     <p>30 min. ago</p>
//                 </div>
//             </li>

//             <li>
//                  <hr className='dropdown-divider'/>
//             </li>

//             <li className='notification-item'>
//                 <i className='bi bi-exclamation-circle text-success'></i>

//                 <div>
//                     <h4>Lorem Ipsum</h4>
//                     <p>hjhjk hjkhjkh hjkhjkdc casyhjdgqw ghg</p>
//                     <p>30 min. ago</p>
//                 </div>
//             </li>

//             <li>
//                  <hr className='dropdown-divider'/>
//             </li>

//             <li className='notification-item'>
//                 <i className='bi bi-check-circle text-danger'></i>

//                 <div>
//                     <h4>Lorem Ipsum</h4>
//                     <p>hjhjk hjkhjkh hjkhjkdc casyhjdgqw ghg</p>
//                     <p>30 min. ago</p>
//                 </div>
//             </li>

//             <li>
//                  <hr className='dropdown-divider'/>
//             </li>

//             <li className='notification-item'>
//                 <i className='bi bi-check-circle text-primary'></i>

//                 <div>
//                     <h4>Lorem Ipsum</h4>
//                     <p>hjhjk hjkhjkh hjkhjkdc casyhjdgqw ghg</p>
//                     <p>30 min. ago</p>
//                 </div>
//             </li>

//             <li>
//                  <hr className='dropdown-divider'/>
//             </li>
//             <li className='dropdown-footer'>
//                 <a href='#'>Show all notifications</a>
//             </li>

//         </ul>
//       </li>
//     </div>
//   )
// }

// export default NavNotification
