import React, { useState, useEffect } from 'react';
import UndefinedQualityTable from './UndefinedQualityTable';
import axios from "axios";

const UndefinedQuality = () => {
    const [items, setItems] = useState([]);

    const getOrderList = async () => {
        try {
            const response = await axios.get("/om/quality/undefinedQuality");
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
                    Recently Added Fruits
                </h5>
                <UndefinedQualityTable items={items} />
            </div>
        </div>
    );
};

export default UndefinedQuality;
