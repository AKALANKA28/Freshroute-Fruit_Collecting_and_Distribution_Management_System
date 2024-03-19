import React from 'react';
import '../main.css';
import VehicleDetailsList from './VehicleDetailsList';

const VehicleDetailsBody = () => {
  return (
    <div id="main"> 
      <section className="body" id='body'>
        <div className="row">
            <div className="row">
              < VehicleDetailsList/>
            </div>    
          </div>  
      </section>  
    </div>
  );
};

export default VehicleDetailsBody;
