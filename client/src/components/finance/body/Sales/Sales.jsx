import React,{useState, useEffect} from 'react'
import CardFilter from '../CardFilter'
import axios from 'axios';
import SalesTable from "./SalesTables";
import SearchBar from './SearchBar'

import './sales.css'


const Sales = () => {
  const [items, setItems] = useState([])
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    };

    const fetchData = () => {
        fetch("http://localhost:8070/sales/")//add the backend link
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
       <div className='div' >
          <div className="card-title">
            Sales Details<span>| {filter}</span>
          </div>
        
    </div>
    <div>
        <SearchBar/>
    </div>
        <SalesTable items={items} />
    </div>
    </div>
  )
  }  

export default Sales
