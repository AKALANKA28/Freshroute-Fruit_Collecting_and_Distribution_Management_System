import React, { useState, useEffect } from 'react';
import RecentOrderTable from './RecentOrderTable';
import axios from "axios";

const RecentOrders = () => {
    const [items, setItems] = useState([]);

    const getOrderList = async () => {
        try {
            const response = await axios.get("/op/recentOrders");
            const responseData = response.data;
            setItems(responseData);

        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting order list");
            }
        }

    };

    useEffect(() => {
        getOrderList();
    }, []);

    return (
        <div className='card recent-sales overflow-auto'>
            <div className="card-body">
                <h5 className="card-title">
                    Recent Orders
                </h5>
                <RecentOrderTable items={items} />
            </div>
        </div>
    );
};

export default RecentOrders;
