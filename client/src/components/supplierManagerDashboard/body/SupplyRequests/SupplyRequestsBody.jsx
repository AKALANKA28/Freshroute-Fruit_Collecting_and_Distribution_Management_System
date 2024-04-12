import React from 'react';
import '../main.css';
import SupplyRequestsList from './SupplyRequestsList';

const SupplyRequestsBody = () => {
  return (
    <div className="main"> 
      <section className="body" id='body'>
        <div className="row">
            <div className="row">
              <SupplyRequestsList />
            </div>    
        </div>  
      </section>  
    </div>
  );
};

export default SupplyRequestsBody;