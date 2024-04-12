import React from 'react';
import '../main.css';
import ProcessDetailsList from './ProcessDetailsList';

const ProcessDetailsBody = () => {
  return (
    <div id="main"> 
      <section className="body" id='body'>
        <div className="row">
            <div className="row">
              < ProcessDetailsList/>
            </div>    
          </div>  
      </section>  
    </div>
  );
};

export default ProcessDetailsBody;
