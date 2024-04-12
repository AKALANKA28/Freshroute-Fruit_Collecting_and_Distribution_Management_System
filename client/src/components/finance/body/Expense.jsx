import React, {useState} from 'react'
import CardFilter from './CardFilter';
import ExpenseChart from './ExpenseChart';

const WebTraffic = () => {

    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    };

  return (
    <div>
      <div className='card'>
      <CardFilter filterChange={handleFilterChange} />

      <div className="card-body pb-0">
        <h5 className="card-title">
          Expenses<span>| {filter}</span>
        </h5>
        <ExpenseChart />
      </div>
    </div>
    </div>
  )
}

export default WebTraffic
