import React, {useState} from 'react'
import CardFilter from './CardFilter';
import DeliverymetricsChart from './DeliverymetricsChart';

const Deliverymetrics = () => {

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
          Delivery Metrics<span>| {filter}</span>
        </h5>
        <DeliverymetricsChart />
      </div>
    </div>
    </div>
  )
}

export default Deliverymetrics
