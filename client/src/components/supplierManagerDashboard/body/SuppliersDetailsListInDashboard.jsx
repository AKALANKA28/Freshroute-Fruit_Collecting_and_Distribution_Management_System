import React, { useState, useEffect } from 'react';
import SuppliersDetailsListTableInDashboard from './SuppliersDetailsListTableInDashboard';

const SuppliersDetailsListInDashboard = () => {
    const [items, setItems] = useState([]);

    const fetchData = () => {
        fetch("http://localhost:8070/Farmer")
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
                    Supplier Details
                </h5>
                <SuppliersDetailsListTableInDashboard items={items} />
            </div>
        </div>
    );
};

export default SuppliersDetailsListInDashboard;