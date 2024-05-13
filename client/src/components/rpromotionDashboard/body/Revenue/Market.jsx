// .\client\src\components\researchDashboard\body\Revenue\Market.jsx
import React, { useState, useEffect } from 'react';
import CardFilter from './CardFilter';
import MarketItem from './MarketItem';
import './Rmain.css';

const Market = () => {
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
          Market<span>| {filter}</span>
          
          <h6 className="card-dis">Fresh Fruit</h6>
          
        </h5>

        <div className="activity">
          {items &&
          items.lenght > 0 &&
          items.map(item => (
            <MarketItem key={item._id} item={item}/>
            ))}
      </div>
       
      </div>
    </div>    );
};

export default Market;
