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
      <div className="card-body pb-0 text-center">
        <h5 className="card-title">
          Weather Forecast
        </h5>
        <BudgetChart />
      </div>
    </div>
  )
}

export default BudgetReport
