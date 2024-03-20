import React, {useState} from 'react'

import CardFilter from './CardFilter';
import BudgetChart from './BudgetChart';

const BudgetReport = () => {

    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    };


  return (
    <div className='card'>
      <CardFilter filterChange={handleFilterChange} />

      <div className="card-body pb-0">
        <h5 className="card-title">
          Transport Fee Report <span>| {filter}</span>
        </h5>
        <BudgetChart />
      </div>
    </div>
  )
}

export default BudgetReport
