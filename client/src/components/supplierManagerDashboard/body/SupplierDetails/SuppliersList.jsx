import React,{useState, useEffect} from 'react'
import CardFilter from '../CardFilter'
import SuppliersTable from './SuppliersTable'

const SuppliersList = () => {

    const [farmers, setItems] = useState([])
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
          Supplier Details
        </h5>
        <SuppliersTable farmers={farmers} />
      </div>
    </div>
  )
}

export default SuppliersList