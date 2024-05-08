import React,{useState, useEffect} from 'react'
import CardFilter from './CardFilter'
import CurrentProcessTable from './CurrentProcessTable'

const CurrentProcess = () => {

    const [items, setItems] = useState([])
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    };

    const fetchData = () => {
        fetch("http://localhost:8070/process/")
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
        Current Process <span>| {filter}</span>
        </h5>
        <CurrentProcessTable items={items} />
      </div>
    </div>
  )
}

export default CurrentProcess
