import React,{useState, useEffect} from 'react'
import CardFilter from './CardFilter'
import SalaryTable from './SalaryTable'

const RecentSales = () => {

    const [items, setItems] = useState([])
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    };

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
    <div className='card recent-sales overflow-auto'>
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Basic Salary <span>| {filter}</span>
        </h5>
        <SalaryTable items={items} />
      </div>
    </div>
  )
}

export default RecentSales
