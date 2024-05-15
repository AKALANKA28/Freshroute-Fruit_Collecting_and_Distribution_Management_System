import React from 'react'
import './main.css'
import PageTitle from './PageTitle'
import Body from './Body'
import img from "../../../assests/driver.jpg"
import { Link } from 'react-router-dom'
import News from './Transactions'
import AssingedOrders from './AssingedOrders'

const Main = () => {
  return (
   
    <main className='main driver-main'>
      <div>
        <div class="row justify-content-center align-items-center g-5">
          <div class="col-9">
             <PageTitle/>
             <Body />
            </div>
          <div class="col-3 bg-white right-col">
              <div>
                <div className='d-flex align-items-center justify-content-center gap-2 p-3 mt-4 mb-3 border-bottom'>
                  <div className="col-3">
                  <img src={img} className='img-fluid rounded-circle profile-img' alt='profile-img'></img>
                  </div>
                 <div className="profile-name-col col-8">
                 <h6>Sunil Samarakoon</h6>
                 <Link to={""} className='Link'>
                   <p>View Profile</p>
                 </Link>
                 </div>
                 <div className='col-1 icon-col'>
                  <i className="bi bi-chevron-right rounded-circle "></i>
                </div> 
                </div>
              <AssingedOrders />
              <News />

            </div>
          </div>
        </div>
        
      </div>
      
  
    </main>
  
  )
}

export default Main
