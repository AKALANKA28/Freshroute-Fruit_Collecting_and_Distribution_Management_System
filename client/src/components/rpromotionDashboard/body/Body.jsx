import React from 'react'
import './main.css'

import Cards from './Cards'
import Reports from './Reports'
import RecentSales from './RecentSales'
import TopSellings from './TopSellings'
import RecentActivity from './RecentActivity'
import BudgetReport from './BudgetReport'
import WebTraffic from './WebTraffic'
import News from './News'
import BackToTop from './BackToTop'
import TopCards from './TopCards'

const Body = () => {


   
  return (
    <div> 
   <section className="body" id='body'>
        <div className="row">
            <div className="col-lg-8">
                <div className="row gap-1">
                    <TopCards />
                    <div className="col-12">
                        <Reports />
                    </div>
                    {/* <div className="col-12">
                     <RecentSales />
                    </div>
                    <div className="col-12">
                     <TopSellings />
                    </div> */}
                </div>
            </div>
            <div className="col-lg-4">
              {/* <RecentActivity /> */}
              {/* <BudgetReport /> */}
              <WebTraffic />
              <News />
              
            </div>
        </div>
        <BackToTop />
   </section>

   </div>
  )
}

export default Body
