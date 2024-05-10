import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import icon1 from './assets/delivery-truck.png';
import icon2 from './assets/fresh.png';

const JoinWithUsSelect = () => {
  return (
    <div>
     <Navbar/>
      <div className='hero' style={{height:800}}>
      <div className='section feature-section d-flex justify-content-center align-items-center'  style={{backgroundColor:"#32CD32"}}>
      <div className="container">
        <div className="row text-center">
          <div className="col-12">
            <br/>
            <p className='subheading'><span>Select one to Join With us </span> </p>
          </div>
          <div className="col-lg-12 card-column d-flex justify-content-center">
            <div className="row align-items-center">
              <div className="col-md-3 px-lg-4">
              <a href="/JoinWithUsSupplier" className="text-decoration-none">
                <div className="text-center card d-flex align-items-center">
                  <img src={icon1} alt="Delivery Truck Icon" className=''/>
                  <h3>As a Farmer</h3>
                  <p>Join our fruit farming community! Access resources, market insights, and support to grow your success.<br/><br/></p>
                </div>
                </a>
              </div>
              <div className="col-md-3 px-lg-4">
              <a href="/JoinWithUsStaff" className="text-decoration-none">
                <div className="text-center card d-flex align-items-center">
                  <img src={icon2} alt="Freshness Icon"/>
                  <h3>As an Employee</h3>
                  <p>Join our workforce! Gain access to comprehensive resources, valuable insights, and unwavering support to excel in your role.</p>
                </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
   
    <Footer />
    </div>
  );
};

export default JoinWithUsSelect;
