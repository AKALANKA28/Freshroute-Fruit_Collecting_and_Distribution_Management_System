import React from 'react'
import './main.css'

import Cards from './Cards'
import Map from './Map'
import TopSellings from './TopSellings'
import RecentActivity from './RecentActivity'
import BudgetReport from './BudgetReport'
import WebTraffic from './WebTraffic'
import News from './News'
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
                    <div className="col-12">
                     <SuppliersDetailsListInDashboard />
                    </div>
                    <div className="col-12">
                     <TopSellings />
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
              <RecentActivity />
              <BudgetReport />
              <WebTraffic />
              {/* <News /> */}
            </div>
        </div>
        <BackToTop />
   </section>
   </div>
  )
}

export default Body
