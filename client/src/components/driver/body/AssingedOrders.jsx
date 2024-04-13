import React, {useState, useEffect} from 'react'
import CardFilter from './CardFilter'
import RecentActivityItem from './AssingedOrdersItem'


const RecentActivity = () => {

    const [items, setItems] = useState([])
   

    const fetchData = () => {
        fetch("")
         .then(res => res.json())
         .then(data => {
            setItems(data);
         })
         .catch(e => console.log(e.message))
    };

    useEffect(() => {
        fetchData();
    }, [])
 
  return (
    <div className='card'>
      <div className="card-body">
        <h5 className="card-title">
          Assigned Orders
        </h5>

        <div className="activity">
          {items &&
          items.lenght > 0 &&
          items.map(item => (
            <RecentActivityItem key={item._id} item={item}/>
            ))}
      </div>
       
      </div>
    </div>
  )
}

export default RecentActivity
