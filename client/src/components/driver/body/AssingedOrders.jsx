import React, {useState, useEffect} from 'react'
import CardFilter from './CardFilter'
import AssingedOrdersItem from './AssingedOrdersItem'


const AssingedOrders = () => {

    const [items, setItems] = useState([])
   

    const fetchData = () => {
        fetch("http://localhost:8070/schedule/")
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
        <div className="activity text-dark">
      

          {items &&
          items.lenght > 0 &&
          items.map(item => (
            <AssingedOrdersItem key={item._id} item={item}/>
            ))}
      </div>
       
      </div>
    </div>
  )
}

export default AssingedOrders
