import React, {useState, useEffect} from 'react'
import CardFilter from './CardFilter'
import RecentActivityItem from './RecentActivityItem'



const RecentActivity = () => {

    const [items, setItems] = useState([])
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    };



  return (
    <div className='card'>
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body" style={{ minHeight: '292px', maxHeight:'288px', overflowY: 'auto' }}>
        <h5 className="card-title">
          Recent Sales<span>| {filter}</span>
        </h5>

        <div className="activity ">
            <RecentActivityItem item={items}/>
      </div>
       
      </div>
    </div>
  )
}

export default RecentActivity
