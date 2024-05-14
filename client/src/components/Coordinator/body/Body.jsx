import React, { useState, useEffect } from 'react';
import './main.css';


import RecentActivity from './RecentActivity';
import BudgetReport from './BudgetReport';
import RecentAdedQuality from './RecentAdedQuality'

import BackToTop from './BackToTop';
import SpinnerModal from '../../spinner/SpinnerModal'; 
import TopCards from '../../Coordinator/body/TopCards';
import SalaryReport from './SalaryReport'

const Body = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loading ? (
        <SpinnerModal show={true} /> // Show SpinnerModal while loading
      ) : (
        <section className="body" id="body">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
              <TopCards/>
             
                <div className="col-12">
                  
                </div>
                <div className="col-12">
                  <RecentAdedQuality />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
            <RecentActivity />
            <SalaryReport />
              
              <BudgetReport />
            </div>
          </div>
          <BackToTop />
        </section>
      )}
    </div>
  );
};

export default Body;
