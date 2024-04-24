// .\client\src\components\researchDashboard\body\Revenue\Regin.jsx
import React, { useState, useEffect } from 'react';
import CardFilter from './CardFilter';
import ReginItem from './ReginItem';
import './Pmain.css';

const Regin = () => {
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
          Regin<span>| {filter}</span>
          <h6 className="card-dis">Sri Lanka</h6>
        </h5>

        <div className="activity">
          {items &&
          items.lenght > 0 &&
          items.map(item => (
            <ReginItem key={item._id} item={item}/>
            ))}
      </div>
       
      </div>
    </div>    );
};

export default Regin;
