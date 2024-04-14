import React from 'react'
import './hero.css'
import play_icon from '../../assets/play_icon.png'
import pause_icon from '../../assets/pause_icon.png'

const Hero = ({heroData, setHeroCount, heroCount, setPlayStatus, playStatus}) => {


  return (
    <div className='hero-section'>
      <div className="container" >
        <div className="col-lg-12">
            <div className="hero-text">
              <p className='text1'>{heroData.text1}</p>
              <p className='text2'>{heroData.text2}</p>
            </div>
            
            <div className="hero-dot-play">
              <ul className="hero-dots">
                  <li onClick={() => setHeroCount(0)} className={heroCount===0?"hero-dot green":"hero-dot"}></li>
                  <li onClick={() => setHeroCount(1)} className={heroCount===1?"hero-dot green":"hero-dot"}></li>
                  <li onClick={() => setHeroCount(2)} className={heroCount===2?"hero-dot green":"hero-dot"}></li>
              </ul>
              <div className="hero-play">
                  <img onClick={()=>setPlayStatus(!playStatus)} src={playStatus?pause_icon:play_icon} alt=''/>
                  <p>See the Video</p>
              </div>
            </div>
        </div>
      </div>   
    </div>
      

  )
}

export default Hero
