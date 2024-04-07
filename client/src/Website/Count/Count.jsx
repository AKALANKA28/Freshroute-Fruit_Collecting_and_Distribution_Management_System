import React from 'react'
import './count.css'

import offer from '../assets/offer.jpeg'

const Count = () => {
  return (
    <div class="offersection section--no-pt section--no-pb section--gutter">
        <div class="container-fluid px-md-0">
                <div class="row gx-0">
                    <div class="col-12 col-md-6">
                        <img class="img-fluid w-100 lazy loaded" src={offer} alt="demo" data-was-processed="true"/>
                    </div>

                    <div class="col-12 col-md-6 offerCol">
                        <div class="offerContent">
                            <div class="white-rectangle">
                              <h6 className='heading'>Special Offers</h6>
                              <p className='subheading'>get <span>30%</span> off</p>
                              <p className='_text'>this is dummy text for this below is use to count</p>
                            </div>
                        </div>
                    </div>

                </div>
        </div>
   </div>
  )
}

export default Count
