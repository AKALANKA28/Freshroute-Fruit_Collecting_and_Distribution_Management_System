import React from 'react';
import '../main.css';
import QualityListComponent from './QualityListComponent';
// import AddQuality from './AddQuality';

const QualityListBody = () => {
  return (
    <div id="main">
      <section className="body" id="body">
        <div className="row">
          <QualityListComponent />
        </div>
      </section>
    </div>
  );
}

export default QualityListBody;

