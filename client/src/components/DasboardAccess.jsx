import React from 'react';
import "./dasboardAccess.css";
import { Link } from 'react-router-dom';

const DasboardAccess = () => {
  return (
    <div className='body'>
      <div className="row text-center">
        <div className="col-lg-12 card-column">
          <div className="row align-items-center">
            <div className="col-md-2 px-lg-4">
              <Link to="/finance">
                <div className="text-center card d-flex align-items-center">
                  <i className='bi bi-cash-stack' style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                  <h3 className='fs-5'>Finance Manager Dashboard</h3>
                </div>
              </Link>
            </div> 

            <div className="col-md-2 px-lg-4">
              <Link to="/coordinator">
                <div className="text-center card d-flex align-items-center">
                  <i className='bi bi-person-lines-fill' style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                  <h3 className='fs-5'>Coordinator Dashboard</h3>
                </div>
              </Link>
            </div> 

            <div className="col-md-2 px-lg-4">
              <Link to="/tDashboard">
                <div className="text-center card d-flex align-items-center">
                  <i className='bi bi-truck' style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                  <h3 className='fs-5'>Transport Manager Dashboard</h3>
                </div>
              </Link>
            </div> 

            <div className="col-md-2 px-lg-4">
              <Link to="/SMDashboard">
                <div className="text-center card d-flex align-items-center">
                  <i className='bi bi-people-fill' style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                  <h3 className='fs-5'>Supplier Manager Dashboard</h3>
                </div>
              </Link>
            </div> 
          </div>
        </div>
        <div className="col-lg-12 card-column" style={{ marginTop: "-20px" }}>
          <div className="row align-items-center">
            <div className="col-md-2 px-lg-4">
              <Link to="/OMDashboard">
                <div className="text-center card d-flex align-items-center">
                  <i className='bi bi-box-seam' style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                  <h3 className='fs-5'>Order Manager Dashboard</h3>
                </div>
              </Link>
            </div> 

            <div className="col-md-2 px-lg-4">
              <Link to="/RPDashboard">
                <div className="text-center card d-flex align-items-center">
                  <i className='bi bi-megaphone' style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                  <h3 className='fs-5'>Promotion Manager Dashboard</h3>
                </div>
              </Link>
            </div> 

            <div className="col-md-2 px-lg-4">
              <Link to="/BMDashboard">
                <div className="text-center card d-flex align-items-center">
                  <i className='bi bi-cart-fill' style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                  <h3 className='fs-5'>Buyer Manager Dashboard</h3>
                </div>
              </Link>
            </div> 

            <div className="col-md-2 px-lg-4">
              <Link to="/StaffManager">
                <div className="text-center card d-flex align-items-center">
                  <i className='bi bi-person-badge-fill' style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                  <h3 className='fs-5'>Staff Manager Dashboard</h3>
                </div>
              </Link>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default DasboardAccess;
