import React from 'react'
import './main.css'

import QuickAccess from './QuickAccess'
import OderDetail from './OderDetail'
import BackToTop from './BackToTop'
import UndefinedQuality from './UndefinedQuality'

const Body = () => {

   
  return (
   <div> 
   <section className="body" id='body'>
        <div className="row">
            <div className="col-lg-8">
                <div className="row">
                    <div className="col-12">
                     <UndefinedQuality />
                    </div>
                    
                </div>
            </div>
            <div className="col-lg-4">
              {/*<QuickAccess />*/}
              <OderDetail />
            </div>
        </div>
        <BackToTop />
   </section>
   </div>
  )
}

export default Body;
