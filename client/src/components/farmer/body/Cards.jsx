import React from 'react'
import axios from "axios";
import Card from  './Card'

axios.defaults.baseURL = "http://localhost:8070/";

const Cards = () => {

return (

 
   <div className='col-12'>   
      <div className="row">
      {
              <Card/>
        }    
      </div>       
  </div>
)
}

export default Cards
