import React, {useState} from 'react'
import CardFilter from './CardFilter';
import SalaryChart from './SalaryChart';

const SalaryReport = () => {

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
          Basic Salary<span>| {filter}</span>
        </h5>
        <SalaryChart />
      </div>
    </div>
    </div>
  )
}

export default SalaryReport
