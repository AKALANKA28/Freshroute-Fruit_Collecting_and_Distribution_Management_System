import React from 'react'
import "./contact.css"
import img from '../../assets/join-with-us.png'

const Contact = () => {
  return (
    <div className='section contact-section'>
      <div className="container">
        <div className="row">
        <div className=" col-md-6 ">
                <img src={img} alt="" className="join-image img-fluid" />
            </div>
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
           
            
        </div>
      </div>
    </div>
  )
}

export default Contact
