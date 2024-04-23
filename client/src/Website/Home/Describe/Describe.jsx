import React from 'react'
import img from '../../assets/image1.jpg'
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
        <img src={img} alt="" className="img1 img-fluid" />
        <img src={img} alt="" className="img2 img-fluid" />
        <img src={img} alt="" className="img3 img-fluid" />
        <img src={img} alt="" className="img4 img-fluid" />



        </div>
                
        </div>
      </div>
    </div>
  )
}

export default Describe
