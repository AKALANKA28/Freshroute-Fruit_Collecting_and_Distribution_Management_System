import React from 'react'
import './main.css'

import Cards from './Cards'
import Map from './Map'
import QuickAccess from './QuickAccess'
import SupplyDetails from './SupplyDetails'
import BackToTop from './BackToTop'
import SuppliersDetailsListInDashboard from './SuppliersDetailsListInDashboard'

const Body = () => {


   
  return (
   <div> 
   <section className="body" id='body'>
        <div className="row">
            <div className="col-lg-8">
                
                <div className="row">
                    <Cards />
                    <div className="col-12">
                        <Map />
                    </div>
                    
                    
                </div>
            </div>
            <div className="col-lg-4">
              <QuickAccess />
              <SupplyDetails />
            </div>
        </div>

        <div className="">
          <SuppliersDetailsListInDashboard />
        </div>
        
        <BackToTop />
   </section>
   </div>
  )
}

export default Body
