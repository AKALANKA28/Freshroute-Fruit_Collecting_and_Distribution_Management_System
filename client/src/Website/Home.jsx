import React, { useEffect, useState } from 'react';
import "./website.css";
import Hero from './Home/Hero/Hero';
import Navbar from './Navbar/Navbar';
import Background from './Home/Background/Background';
import About from './Home/About/About';
import Count from './Home/Count/Count';
import Features from './Home/Features/Features';
import Partners from './Home/Partners/Partners';
import Footer from './Footer/Footer';
import Contact from './Home/Contact/Contact';
import Blog from './Home/Blog/Blog';
import Describe from './Home/Describe/Describe';
import GoogleTranslate from './Components/GoogleTranslate';

const Home = () => {
    let heroData = [
        { text1: "ORGANIC", text2: "& NATURAL" },
        { text1: "Indulge", text2: "your passions" },
        { text1: "Give in to", text2: "your passions" },
    ];

    const [heroCount, setHeroCount] = useState(0);
    const [playStatus, setPlayStatus] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setHeroCount((count) => count === 0 ? 2 : count - 1);
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Navbar />
            <div className='hero__section'>
                <Hero
                    setPlayStatus={setPlayStatus}
                    heroData={heroData[heroCount]}
                    heroCount={heroCount}
                    setHeroCount={setHeroCount}
                    playStatus={playStatus}
                />
                <Background playStatus={playStatus} heroCount={heroCount} />
            </div>
            <div>
                <Features />
                <Count />
                <About />
                <Partners />
                <Describe />
                <Contact />
                {/* <Blog /> */}
                <Footer />
            </div>
            {/* <GoogleTranslate /> Add the GoogleTranslate component */}
        </>
    );
};

export default Home;
