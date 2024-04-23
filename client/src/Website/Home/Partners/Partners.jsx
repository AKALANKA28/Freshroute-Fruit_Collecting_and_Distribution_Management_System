import React from 'react'

import './partners.css'

import img1 from '../../assets/keellslogo.png'
import img2 from '../../assets/Glomark.png'
import img3 from '../../assets/MDlogo.png'
import img4 from '../../assets/foodcity.png'
import img5 from '../../assets/arpico.png'


const Partners = () => {
  return (
    <div className='section section_partners'>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="row text-center">
            <div className="col-12">
                {/* <h6 className='heading'>What We Offer</h6> */}
                <p className='subheading'><span>our</span> Partners</p>
            </div>
            <div className="col-lg-12 logo-col flex_center">
              <div className="row text-align-center">

                <img src={img1} alt='img1' className='col-md-4 px-lg-4 img1'></img>
                <img src={img2} alt='img1' className='col-md-4 px-lg-4  img2'></img>
                <img src={img3} alt='img1' className='col-md-4 img3'></img>
                <img src={img4} alt='img1' className='col-md-4 px-lg-4 img4'></img>
                <img src={img5} alt='img1' className='col-md-4 px-lg-4 img5'></img>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Partners
