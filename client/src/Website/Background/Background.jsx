import React from 'react'

import './background.css'

import video1 from '../../Website/assests/video1.mp4'
import image1 from '../../Website/assests/image1.png'
import image2 from '../../Website/assests/image2.png'
import image3 from '../../Website/assests/image3.png'


const Background = (playStatus, heroCount) => {

  if (playStatus){
    return (
        <video className='background' autoPlay loop muted>
            <source src={video1} type='video/mp4' />
        </video>
    )
  }
  else if(heroCount === 0){
    return <img src={image1} className='background' alt='' />
  }
  else if(heroCount === 1){
    return <img src={image2} className='background' alt='' />
  }
  else if(heroCount === 2){
    return <img src={image3} className='background' alt='' />
  }
}

export default Background
