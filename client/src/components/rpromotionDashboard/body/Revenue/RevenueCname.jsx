// ./client\src\components\researchDashboard\body\Revenue\RevenueCname.jsx
import React, { useState } from 'react'
import CardFilter from './CardFilter'
import RevenuChart from './RevenuChart';


const RevenueCname = () => {

  const [filter, setFilter] = useState('Today');
  const handleFilterChange = filter => {
      setFilter(filter)
  };

  return (
    <div className='card'>
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Revenue<span>| {filter}</span>
        </h5>
        <RevenuChart />
      </div>
    </div>
  )
}

export default RevenueCname
