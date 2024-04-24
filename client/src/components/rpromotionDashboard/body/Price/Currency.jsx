// .\client\src\components\researchDashboard\body\Price\Regin.jsx
import React, { useState, useEffect } from 'react';
import CardFilter from './CardFilter';
import CurrencyItem from './CurrencyItem';
import './Pmain.css';

const Currency = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('Today');
    
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const fetchData = () => {
        fetch("") // Add your API URL here
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            })
            .catch((e) => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div className='card'>
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Currency<span>| {filter}</span>
          <h6 className="card-dis">LKR(Rs)</h6>
        </h5>

        <div className="activity">
          {items &&
          items.lenght > 0 &&
          items.map(item => (
            <CurrencyItem key={item._id} item={item}/>
            ))}
      </div>
       
      </div>
    </div>    );
};

export default Currency;
