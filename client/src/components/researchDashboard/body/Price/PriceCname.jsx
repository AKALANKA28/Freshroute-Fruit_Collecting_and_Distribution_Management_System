// ./client\src\components\researchDashboard\body\Revenue\RevenueCname.jsx
import React, { useState } from 'react'
import CardFilter from './CardFilter'
import PriceChart from './PriceChart';


const PriceCname = () => {

  const [filter, setFilter] = useState('Today');
  const handleFilterChange = filter => {
      setFilter(filter)
  };

  return (
    <div className='card'>
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Price<span>| {filter}</span>
        </h5>
        <PriceChart />
      </div>
    </div>
  )
}

export default PriceCname
