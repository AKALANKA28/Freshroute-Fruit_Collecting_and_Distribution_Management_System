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

const Body = () => {
  return (
    <div>
      <section className="body" id='body'>
        <div className="container-fluid">
        <div className="main">
          <Reports />
        </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-12">
                  <Cards />
                </div>
                
                <div className="col-12">
                <div className="">
                  <RecentSales />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {/* <RecentActivity /> */}
              <div className="text-lg-end"> 
                <BudgetReport />
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
      </section>
    </div>
  )
}

export default Body
