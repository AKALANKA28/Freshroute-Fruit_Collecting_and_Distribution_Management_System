import React, { useState, useEffect } from 'react';
import QualityDetailsTableInDashboard from './QualityDetailsTableInDashboard';

const QualityDetailsInDashboard = () => {
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
                    Prediction Details
                </h5>
                <QualityDetailsTableInDashboard items={items} />
            </div>
        </div>
    );
};

export default QualityDetailsInDashboard;