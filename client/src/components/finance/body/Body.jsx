import React from 'react'
// import './main.css'

import Cards from './Cards'
import Reports from './Reports'
import RecentSales from './RecentSales'
import TopSellings from './TopSellings'
import RecentActivity from './RecentActivity'
import BudgetReport from './BudgetReport'
import ExpenseReport from './Expense'
import News from './News'
import BackToTop from './BackToTop'
import TopCards from './TopCards'

const Body = () => {


   
  return (
   <div> 
   <section className="body" id='body'>
        <div className="row">
            <div className="col-lg-8 ">
                <div className="row gap-1">  
                <TopCards/>
                      {/* <Cards /> */}
                    <div className="col-12">
                        <Reports />
                    </div>
                    <div className="col-12">
                     {/* <RecentSales /> */}
                    </div>
                    <div className="col-12">
                     {/* <TopSellings /> */}
                    </div>
                </div>
            </div>
            <div className="col-lg-4 main-right-col">
              {/* <RecentActivity /> */}
              {/* <BudgetReport /> */}
              <ExpenseReport />
              {/* <News /> */}
            </div>
        </div>
        <BackToTop />
   </section>
   </div>
  )
}

export default Body
