import React, {useState} from 'react'
import CardFilter from './CardFilter'



const RecentActivity = () => {

  
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    };



 
  return (
    <div className='card'>
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
        Real-Time Market Prices<span>| {filter}</span>
        </h5>
        <a href='https://www.cbsl.gov.lk/en/statistics/economic-indicators/price-report'>
          <button style={{width:"100%"}} className='btn btn-primary'> Central Bank Price List</button>
          </a>

        <hr></hr>
        <a href='https://ceypetco.gov.lk/marketing-sales/'>
          <button  style={{width:"100%"}} className='btn btn-primary '> Ceypetco Fuel Price List   </button>
          </a>
       
       
      </div>
    </div>
  )
}

export default RecentActivity
