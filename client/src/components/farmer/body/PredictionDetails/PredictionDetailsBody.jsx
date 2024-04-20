import React from 'react';
import '../main.css';
import PredictionsList from './PredictionsList';

const SupplierDetailsBody = () => {
  return (
    <div className="main"> 
      <section className="body" id='body'>
        <div className="row">
            <div className="row">
              <PredictionsList />
            </div>    
        </div>  
      </section>  
    </div>
  );
};

export default SupplierDetailsBody;