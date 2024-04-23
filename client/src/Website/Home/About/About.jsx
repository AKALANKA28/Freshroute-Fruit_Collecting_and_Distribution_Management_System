import React from 'react'


import './about.css';
import FreshRoute from '../../assets/freshroute-green.svg'
import aboutimg from '../../assets/middlepic.svg'

const About = () => {
  return (
    <>
    <div className="section text-section section_about">
        <div className="container">
            <div class="section-text text-div">
                <h2 class="text-center">
                   Distrubutors of organic produce            
                </h2>
            </div>
        </div>
    </div>
    <div className='section  section_about flex_center'>
        <div className="section_about-overlay flex_center">
          <img src={FreshRoute} alt='frshroute' />
        </div>
        <div className="container about-content">
            <div className="row align-items-center">
                <div className="col-12 col-lg-4">
                    <div className="section-heading">
                        <h2 className="_title">
                            About <span>Freshroute</span>
                        </h2>
                        <h2 className='_subtitle'>Distributors</h2>
                    </div>
                    <p class="d-none d-sm-block">
                     <button type="button" className="custom__button">Know More</button>
                    </p>
                </div>

                <div className="col-12 col-lg-4 text-center ">
                    <img src={aboutimg} alt='about img' className='about-img'/>
                </div>

                <div className="col-12 col-lg-4 _text">
                    <p>
                        Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                    </p>
                    <p>
                        Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                    </p>
                </div>

                
            </div>
        </div> 
    </div>

    </>
  )
}

export default About
