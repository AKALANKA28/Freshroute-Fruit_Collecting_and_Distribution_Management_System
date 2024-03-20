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
          <div className='div-3'>
            <img
              loading="lazy"
              srcSet="..."
              className="shrink-0 rounded-xl border border-solid aspect-[1.02] border-zinc-300 w-[61px]"
              alt=""

            />
            <img
              loading="lazy"
              srcSet="..."
              className="shrink-0 rounded-xl border border-solid aspect-[1.02] border-zinc-300 w-[61px]"
              alt=""

            />
            <img
              loading="lazy"
              srcSet="..."
              className="shrink-0 rounded-xl border border-solid aspect-[1.02] border-zinc-300 w-[61px]"
              alt=""
            />
          <div className="div-4">
            <img
              loading="lazy"
              // src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4344f5117352194c3f4c1b9dd5d7417a682dc23df1854608490876dd8637053?"
              className="img-2"
            />
            <div className="div-5">Add Sales</div>
          </div>
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
