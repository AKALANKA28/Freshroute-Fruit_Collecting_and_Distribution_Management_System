// ./client\src\components\researchDashboard\body\Revenue\RevenueCname.jsx
import React, { useState } from 'react'
import CardFilter from './CardFilter'
import VolChart from './VolChart';


const VolCname = () => {

  const [filter, setFilter] = useState('Today');
  const handleFilterChange = filter => {
      setFilter(filter)
  };

  return (
    <div className='card'>
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Volume<span>| {filter}</span>
        </h5>
        <VolChart />
      </div>
    </div>
  )
}

export default VolCname
