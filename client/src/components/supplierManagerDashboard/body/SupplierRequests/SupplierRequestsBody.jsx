import React from 'react';
import '../main.css';
import SupplierRequestsList from './SupplierRequestsList';

const SupplierRequestsBody = () => {
  return (
    <div className="main"> 
      <section className="body" id='body'>
        <div className="row">
            <div className="row">
              <SupplierRequestsList />
            </div>    
        </div>  
      </section>  
    </div>
  );
};

export default SupplierRequestsBody;