// ./client\src\components\researchDashboard\body\Revenue\RBody.jsx
import React from 'react'
import './Vmain.css'

import Cards from './Cards'
import VolCname from './VolCname'
import VoLiCname from './VoLiCname'

import Market from './Market'
import Regin from './Regin'
import Currency from './Currency'


const VBody = () => {


   
  return (
    <div> 
   <section className="body" id='body'>
        <div className="row">
            <div className="col-lg-10">
                <div className="row">
                  {
                    Cards && Cards.length>0 &&
                    Cards.map(card=><card key={card._id} card={card}/>)
                  }
                  
                    
                </div>
            </div>
            <div className="col-lg-3">
              <Market />
            
              </div>
              
              <div className="col-lg-3">
              <Regin />
              </div>

              <div className="col-lg-3">
              <Currency />
              </div>

            <div className="col-lg-6 r1">
            <VoLiCname/>
            </div>
            <div className="col-lg-6 r1">
            <VolCname/>
            </div>
        </div>
        
   </section>

   </div>
  )
}

export default VBody
