import React, {useEffect, useState} from 'react'
import "./website.css"
import Hero from './Hero/Hero';
import Navbar from './Navbar/Navbar';
import Background from './Background/Background';

const Website = () => {

    let heroData = [
        {text1: "ORGANIC", text2:"& NATURAL"},
        {text1: "Indulge", text2:"your passions"},
        {text1: "Give in to", text2:"your passions"},
    
      ]
    
    const [heroCount, setHeroCount] = useState(2);
    const [playStatus, setPlayStatus] = useState(false);

      useEffect(()=>{
        setInterval(() => {
            setHeroCount((count) => {return count ===2?0:count+1})
        }, 50000);
     
      }, []);
    
  return (
    <div>
        <Background playStatus={playStatus} heroCount = {heroCount}  />
        <Navbar />
        <Hero
            setPlayStatus = {setPlayStatus} 
            heroData = {heroData[heroCount]}
            heroCount = {heroCount} 
            setHeroCount = {setHeroCount} 
            playStatus={playStatus}
        />
    </div>
  )
}

export default Website
