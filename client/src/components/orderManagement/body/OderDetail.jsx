import React, { useState, useEffect } from 'react';
import axios from "axios";
import OrderDetailChart from './OrderDetailChart';

const OderDetail = () => {
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("om/orderList");
                setOrderDetails(response.data);
            } catch (err) {
                alert(err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className='card'>
                <div className="card-body pb-0">
                    <h5 className="card-title">
                        Order Status
                    </h5>
                    <OrderDetailChart orderDetails={orderDetails} />
                </div>
            </div>
        </div>
    );
};

export default OderDetail;
