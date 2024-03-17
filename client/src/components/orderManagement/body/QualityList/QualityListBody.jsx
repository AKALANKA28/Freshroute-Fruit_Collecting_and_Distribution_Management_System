// //C:\Users\HP\Documents\GitHub\MERN_Project\client\src\components\orderManagement\body\QualityList\QualityListBody.jsx

// import React from 'react'
// import '../main.css'

// import QualityListComponent from './QualityListComponent'

// const QualityListBody = () => {

//   return (
//     <div id = 'main'> 
      
//       <section className="body" id='body'>
//         <div className="row">
//             <div className="col-lg-8">
//                 <div className="row">
//                     <button className = "btn btn-primary"><a href='AddQualityBody'><i class="bi bi-plus-circle"></i> Add Quality</a></button>
//                     <QualityListComponent />
//                 </div>    
//             </div>  
//         </div>  
//       </section>  
//    </div>
//   )
// }

// export default QualityListBody;

import React from 'react';
import '../main.css';
import QualityListComponent from './QualityListComponent';
import AddQuality from './AddQuality';

const QualityListBody = () => {
  return (
    <div id="main">
      <section className="body" id="body">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <button className="btn btn-primary" onClick={() => window.location.href = '/AddQualityBody'}>
                <i className="bi bi-plus-circle"></i> Add Quality
              </button>
              <QualityListComponent />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QualityListBody;

