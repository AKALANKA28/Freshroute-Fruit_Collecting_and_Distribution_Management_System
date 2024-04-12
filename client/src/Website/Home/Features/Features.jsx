import React from 'react'
import './features.css'


// import mango from '../assets/mango.png'
// import banana from '../assets/banana.png'
// import watermelon from '../assets/watermelon.png'
// import grapes from '../assets/grapes.png'


const Features = () => {
  return (
    <div className='section feature-section'>
      <div className="container flex_center">
        <div className="row text-center">
            <div className="col-12">
                <h6 className='heading'>What We Offer</h6>
                <p className='subheading'><span>consectetur</span> adipiscing elit Sed do</p>
            </div>
            <div className="col-lg-12 card-column">
              <div className="row align-items-center">
                  <div className="col-md-3">
                    <div className="py-6 px-4 text-white text-center card1">
                      <h3 className="mb-3">Get Started With Your Free Trial</h3>
                      <p >Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.
                      </p>
                      <a href="#" className="btn btn-light mb-0">Get Started Today</a>
                    </div>
                  </div>
                  <div className="col-md-3 px-lg-4">
                    <div className="text-center card">
                      {/* <img src={mango} alt="Spa Icon" /> */}
                      <h3>feature 1</h3>
                      <p>Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 px-lg-4">
                    <div className="text-center card">
                    {/* <img src={banana} alt="Spa Icon"/> */}
                      <h3>feature 2</h3>
                      <p >Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.
                      </p>
                    </div>
                  </div>  
                 
              </div>
            </div>
            <div className="col-lg-12 card-column col2">
              <div className="row align-items-center">
              <div className="col-md-3 px-lg-4">
                    <div className="text-center card">
                    {/* <img src={watermelon} alt="Spa Icon"/> */}
                      <h3>feature 3</h3>
                      <p >Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 px-lg-4">
                    <div className="text-center card">
                    {/* <img src={grapes} alt="Spa Icon"/> */}
                      <h3>feature 4</h3>
                      <p >Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 px-lg-4">
                    <div className="text-center card">
                    {/* <img src={grapes} alt="Spa Icon"/> */}
                      <h3>feature 5</h3>
                      <p >Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.
                      </p>
                    </div>
                  </div>
                 
              </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Features
