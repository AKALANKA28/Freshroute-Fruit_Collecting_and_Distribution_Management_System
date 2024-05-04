import React from 'react'
import im1 from '../../assets/im1.jpg'
import im2 from '../../assets/im8.jpg'
import im4 from '../../assets/im4.jpg'
import im5 from '../../assets/im6.webp'


import './Describe.css'

const Describe = () => {
  return (
    <div className='section'>
      <div className="container mb-5">
        <div className="row">
        <div className="col-md-6">
            <div class="">
                <h6 className='heading'>Join with us</h6>
                <p className='subheading'>Like to Join with us?</p>
                <p className='_text'>
                this is dummy tethis is dummy text for this below is use to countxtt for this below is u se to countxt for 
                Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.
                </p>
            </div>
        </div>  
        <div className=" col-md-6 left-column">
        <img src={im1} alt="" className="img1 img-fluid" />
        <img src={im2} alt="" className="img2 img-fluid" />
        <img src={im4} alt="" className="img3 img-fluid" />
        <img src={im5} alt="" className="img4 img-fluid" />



        </div>
                
        </div>
      </div>
    </div>
  )
}

export default Describe
