import React from 'react'
import "./contact.css"
import img from '../../assets/join-with-us.png'
import { Link } from 'react-router-dom'

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
                    <h6 className='heading mt-5'>Join with us</h6>
                    <p className='subheading'>Like to Join with us?</p>
                    <p className='_text'>
                    Whether you're a small-scale farmer looking to optimize your harvest or a large distributor seeking to streamline your operations, Harvest Hub is here to support you every step of the way. Together, let's revolutionize the fruit industry and create a brighter, more sustainable future for generations to come.
                    </p>
                </div>
                <div className="button_row d-flex gap-3 mt-5">
                  <Link to="/contact">
                  <button className='home-button bg-dark'>Contact Us</button>
                  </Link>
                  <a href="/JoinWithUsSelect" className="text-decoration-none">
                  <button className='home-button'>Join With US</button>
                  </a>
                </div>
            </div>
           
            
        </div>
      </div>
    </div>
  )
}

export default Contact
