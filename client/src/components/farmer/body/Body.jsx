import React from 'react'
import './main.css'

import Cards from './Cards'
import QuickAccess from './QuickAccess'
import WeatherReport from './WeatherReport'
import FruitDetails from './FruitDetails'
import BackToTop from './BackToTop'
import PredictionsDetailsListInDashboard from './PredictionsDetailsListInDashboard'

const Body = () => {


   
  return (
   <div> 
   <section className="body" id='body'>
        <div className="row">
            <div className="col-lg-8">
                <div className="row">
                    <Cards />
                    
                    <div className="col-12">
                     <PredictionsDetailsListInDashboard />
                    </div>
                    
                </div>
            </div>
            <div className="col-lg-4">
              <QuickAccess />
              <WeatherReport />
              <FruitDetails />
            </div>
        </div>
        <BackToTop />
   </section>
   </div>
  )
}

export default Body;
