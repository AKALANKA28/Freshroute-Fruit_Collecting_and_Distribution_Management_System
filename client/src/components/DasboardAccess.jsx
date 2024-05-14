import React from 'react'
import "./dasboardAccess.css"

import icon1 from '../Website/assets/delivery-truck.png'
import icon2 from '../Website/assets/fresh.png'
import icon3 from '../Website/assets/verified.png'
import icon4 from '../Website/assets/support.png'
import icon5 from '../Website/assets/easy-to-use.png'
import icon6 from '../Website/assets/support.png'
import icon7 from '../Website/assets/easy-to-use.png'
import { Link } from 'react-router-dom'


const DasboardAccess = () => {
  return (
    <div className='body' style={{}}>
     <div className="row text-center">
            <div className="col-lg-12 card-column">
              <div className="row align-items-center">
                  <div className="col-md-2 px-lg-4">
                    <Link to="/finance">
                    <div className="text-center card d-flex align-items-center">
                      <img src={icon1} alt="Icon 1" className=''/>
                      <h3 className='fs-5'>Finance Manager Dasboard</h3>
                    </div>
                    </Link>
                  </div> 

                  <div className="col-md-2 px-lg-4">
                    <Link to="/coordinator">
                    <div className="text-center card d-flex align-items-center">
                      <img src={icon1} alt="Icon 1" className=''/>
                      <h3 className='fs-5'>Coordinator Dasboard</h3>
                    </div>
                    </Link>
                  </div> 

                  <div className="col-md-2 px-lg-4">
                    <Link to="/tDashboard">
                    <div className="text-center card d-flex align-items-center">
                      <img src={icon1} alt="Icon 1" className=''/>
                      <h3 className='fs-5'>Transport Manager Dasboard</h3>
                    </div>
                    </Link>
                  </div> 

                 <div className="col-md-2 px-lg-4">
                    <Link to="/OMDashboard">
                    <div className="text-center card d-flex align-items-center">
                      <img src={icon1} alt="Icon 1" className=''/>
                      <h3 className='fs-5'>Supplier Manager Dasboard</h3>
                    </div>
                    </Link>
                  </div> 
                 
              </div>
            </div>
            <div className="col-lg-12 card-column" style={{marginTop:"-20px"}}>
              <div className="row align-items-center">
              <div className="col-md-2 px-lg-4">
                    <Link to="/SMDashboard">
                    <div className="text-center card d-flex align-items-center">
                      <img src={icon1} alt="Icon 1" className=''/>
                      <h3 className='fs-5'>Order Manager Dasboard</h3>
                    </div>
                    </Link>
                  </div> 

                  <div className="col-md-2 px-lg-4">
                    <Link to="/RPDashboard">
                    <div className="text-center card d-flex align-items-center">
                      <img src={icon1} alt="Icon 1" className=''/>
                      <h3 className='fs-5'>Promotion Manger Dasboard</h3>
                    </div>
                    </Link>
                  </div> 

                 <div className="col-md-2 px-lg-4">
                    <Link to="/BMDashboard">
                    <div className="text-center card d-flex align-items-center">
                      <img src={icon1} alt="Icon 1" className=''/>
                      <h3 className='fs-5'>Buyer Manager Dasboard</h3>
                    </div>
                    </Link>
                  </div> 

                <div className="col-md-2 px-lg-4">
                    <Link to="/StaffManager">
                    <div className="text-center card d-flex align-items-center">
                      <img src={icon1} alt="Icon 1" className=''/>
                      <h3 className='fs-5'>Staff Manger Dasboard</h3>
                    </div>
                    </Link>
                  </div> 
                 
              </div>
            </div>

        </div>
    </div>
  )
}

export default DasboardAccess
