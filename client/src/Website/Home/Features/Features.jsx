import React from 'react'
import './features.css'


import icon1 from '../../assets/delivery-truck.png'
import icon2 from '../../assets/fresh.png'
import icon3 from '../../assets/verified.png'
import icon4 from '../../assets/support.png'


const Features = () => {
  return (
<>
   
    <div className='section feature-section'>
      <div className="container flex_center">
        <div className="row text-center">
            <div className="col-12">
                <h6 className='heading'>What We Offer</h6>
                <p className='subheading'><span>consectetur</span> adipiscing elit Sed do</p>
            </div>
            <div className="col-lg-12 card-column">
              <div className="row align-items-center">
                  <div className="col-md-3">
                    <div className="py-6 px-4 text-white text-center card1">
                      <h3 className="mb-3">Get Started With Your Free Trial</h3>
                      <p >Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.
                      </p>
                      <a href="#" className="btn btn-light mb-0">Get Started Today</a>
                    </div>
                  </div>
                  <div className="col-md-3 px-lg-4">
                    <div className="text-center card d-flex align-items-center">
                      <img src={icon1} alt="Icon 1" className=''/>
                      <h3>On-Time Delivery</h3>
                      <p>Guarantee timely delivery of orders to customers' specified locations.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 px-lg-4">
                    <div className="text-center card d-flex align-items-center">
                    <img src={icon2} alt="icon2"/>
                      <h3>Freshness</h3>
                      <p >Promise that all products will be delivered fresh and in optimal condition, meeting high standards of quality and taste.
                      </p>
                    </div>
                  </div>  
                 
              </div>
            </div>
            <div className="col-lg-12 card-column col2">
              <div className="row align-items-center">
              <div className="col-md-3 px-lg-4">
                    <div className="text-center card d-flex align-items-center">
                    <img src={icon3} alt="Spa Icon"/>
                      <h3>Easy Product Browsing</h3>
                      <p >Customers can easily browse through a variety of fruits available for purchase.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 px-lg-4">
                    <div className="text-center card d-flex align-items-center">
                    <img src={icon3} alt="icon3"/>
                      <h3>Secure Checkout Process</h3>
                      <p >Our Secure and Convenient Checkout Process prioritizes the safety and convenience of our customers, with multiple secure payment options.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 px-lg-4">
                    <div className="text-center card d-flex align-items-center">
                    <img src={icon4} alt="icon4"/>
                      <h3> 24/7 Customer Support</h3>
                      <p >Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.
                      </p>
                    </div>
                  </div>
                 
              </div>
            </div>

        </div>
      </div>
    </div>
    
</>
    
  )
}

export default Features
