import React from 'react'
import im1 from '../../assets/vineyard.jpg'
import im2 from '../../assets/grapes.jpg'
import im4 from '../../assets/strawberry.jpg'
import im5 from '../../assets/strawberry.jpg'


import './Describe.css'

const Describe = () => {
  return (
    <div className='section'>
      <div className="container mb-5">
        <div className="row">
        <div className="col-md-6">
            <div class="">
                <h6 className='heading'>Our Mission</h6>
                <p className='subheading'><span>Streamlining</span> <br/> Fruit Collection and <span>Distribution</span></p>
                <p className='_text'>
                We believe in harnessing the power of technology to create seamless experiences that benefit both producers and consumers. Our mission is to empower farmers and distributors with the tools they need to efficiently collect, manage, and distribute fruits while ensuring freshness and quality every step of the way.
                </p>
            </div>
        </div>  
        <div className=" col-md-6 left-column">
        <img src={im1} alt="" className="img1 img-fluid" />
        <img src={im2} alt="" className="img2 img-fluid" />
        {/* <img src={im4} alt="" className="img3 img-fluid" /> */}
        <img src={im5} alt="" className="img4 img-fluid" />



        </div>
                
        </div>
      </div>
    </div>
  )
}

export default Describe
