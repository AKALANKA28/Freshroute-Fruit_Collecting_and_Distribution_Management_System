// ./client\src\components\researchDashboard\body\Revenue\RevLiCname.jsx
import React, { useState } from 'react'
import CardFilter from './CardFilter'
import RevLiChart from './RevLiChart';


const RevLiCname = () => {

  const [filter, setFilter] = useState('Today');
  const handleFilterChange = filter => {
      setFilter(filter)
  };

  return (
    <div className='card'>
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Average Revenue per capita<span>| {filter}</span>
        </h5>
        <RevLiChart />
      </div>
    </div>
  )
}

export default RevLiCname
