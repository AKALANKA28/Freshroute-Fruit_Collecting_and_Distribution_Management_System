import React, {useState} from 'react'
import CardFilter from './CardFilter';
import WebTrafficChart from './WebTrafficChart';

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
          Research Analysis<span>| {filter}</span>
        </h5>
        <WebTrafficChart />
      </div>
    </div>
    </div>
  )
}

export default WebTraffic
