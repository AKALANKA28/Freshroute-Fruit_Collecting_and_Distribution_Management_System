import React from 'react';
import Navbar2 from './Navbar/Navbar2'
import Footer from './Footer/Footer';
import icon1 from './assets/farmerIcon.png';
import icon2 from './assets/employeeIcon.png';

const JoinWithUsSelect = () => {
  return (
    <div>
     <Navbar2 />
      
      <div className='section'>
      <div className="container">
        <div className="row text-center">
          <div className="col-12">
            
            <p className='subheading'><span>Select one to Join With us </span> </p>
          </div>
          <div className="card-column">
            <div className="row">
              <div className="col-md-6 px-lg-4">
              <a href="/JoinWithUsSupplier" className="text-decoration-none">
                <div className="text-center card align-items-center">
                  <img src={icon1} alt="Delivery Truck Icon" className=''/>
                  <h3>As a Farmer</h3>
                  <p>Join our fruit farming community! Access resources, market insights, and support to grow your success.<br/><br/></p>
                </div>
                </a>
              </div>
              <div className="col-md-6 px-lg-4">
              <a href="/JoinWithUsStaff" className="text-decoration-none">
                <div className="text-center card align-items-center">
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
     
   
    <Footer />
    </div>
  );
};

export default JoinWithUsSelect;
