import React from 'react';
import '../main.css';
import ScheduleDetailsList from './ScheduleDetailsList';

const ScheduleDetailsBody = () => {
  return (
    <div id="main"> 
      <section className="body" id='body'>
        <div className="row">
            <div className="row">
              < ScheduleDetailsList/>
            </div>    
          </div>  
      </section>  
    </div>
  );
};

export default ScheduleDetailsBody;
