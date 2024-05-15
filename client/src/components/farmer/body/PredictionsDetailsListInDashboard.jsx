import React, { useState, useEffect } from 'react';
import PredictionsDetailsListTableInDashboard from './PredictionsDetailsListTableInDashboard';

const PredictionsDetailsListInDashboard = () => {
    const [items, setItems] = useState([]);

    const fetchData = () => {
        fetch("http://localhost:8070/Prediction")
            .then(res => res.json())
            .then(data => {
                setItems(data);
            })
            .catch(e => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='card recent-sales overflow-auto'>
            <div className="card-body">
                <h5 className="card-title">
                    Supply Prediction Details
                </h5>
                <PredictionsDetailsListTableInDashboard items={items} />
            </div>
        </div>
    );
};

export default PredictionsDetailsListInDashboard;