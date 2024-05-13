import React from 'react'
// import './main.css'

import Cards from './Cards'
import RecentSales from './RecentSales'
import TopSellings from './TopSellings'
import RecentActivity from './AssingedOrders'
import BudgetReport from './BudgetReport'
// import ExpenseReport from './Expense'
import News from './Transactions'
import BackToTop from './BackToTop'
import Map from '../Components/map/Map'
import AssingedOrders from './AssingedOrders'

const Body = () => {


   
  return (
   <div> 
   <section className="body" id='body'>
        <div className="row">
            <div >
                <div className="row gap-1">
                  <div className="">
                  <Cards />
                  </div>
                  <div className="col-12">
                    <div className='card map-card'>
                      <Map />
                    </div>
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
