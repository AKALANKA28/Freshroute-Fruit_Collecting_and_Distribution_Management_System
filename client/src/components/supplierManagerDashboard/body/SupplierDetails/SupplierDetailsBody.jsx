import React from 'react';
import '../main.css';
import SuppliersList from './SuppliersList';

const SupplierDetailsBody = () => {
  return (
    <div className="main"> 
      <section className="body" id='body'>
        <div className="row">
            <div className="row">
              <SuppliersList />
            </div>    
        </div>  
      </section>  
    </div>
  );
};

export default SupplierDetailsBody;