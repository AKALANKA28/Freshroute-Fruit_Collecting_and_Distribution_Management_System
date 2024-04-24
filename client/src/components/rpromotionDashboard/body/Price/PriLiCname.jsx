// ./client\src\components\researchDashboard\body\Revenue\RevLiCname.jsx
import React, { useState } from 'react'
import CardFilter from './CardFilter'
import PriLiChart from './PriLiChart';


const PriLiCname = () => {

  const [filter, setFilter] = useState('Today');
  const handleFilterChange = filter => {
      setFilter(filter)
  };

  return (
    <div className='card'>
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Average Price per capita<span>| {filter}</span>
        </h5>
        <PriLiChart />
      </div>
    </div>
  )
}

export default PriLiCname
