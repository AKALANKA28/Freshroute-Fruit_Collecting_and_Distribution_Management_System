import React from 'react';
import '../main.css';
import QualityListComponent from './QualityListComponent';
// import AddQuality from './AddQuality';

const QualityListBody = () => {
  return (
    <div id="main">
      <section className="body" id="body">
        <div className="row">
          <div className="col-12">
          <QualityListComponent />
          </div>
        </div>
      </section>
    </div>
  );
}

export default QualityListBody;

