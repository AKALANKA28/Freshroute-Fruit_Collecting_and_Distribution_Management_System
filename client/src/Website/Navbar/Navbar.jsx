import React, { useState, useEffect } from 'react';
import "./navbar.css"
import { Link } from 'react-router-dom'; // Import Link from React Router

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [initialScroll, setInitialScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
      
      if (initialScroll && scrollTop > 0) {
        setInitialScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialScroll]);

  return (
    <div className={`main-header ${isScrolled && !initialScroll ? 'stricky-header' : ''}`}>
      <nav className='nav'>
          <div className='nav-logo'><a href='/home'>FreshRoute.</a></div>
          <ul className='nav-menu'>
            <li className='nav-list'><a href='/home'>Home</a></li>
            <li className='nav-list'><a href='/about'>About</a></li>
            <li className='nav-list'><a href='/shop'>Shop</a></li>
            <li className='nav-list'><a href='/contact'>Contact</a></li>
            <li className='nav-login'>
                <Link to='/Login'>
                    <span>Login</span>
                </Link>
            </li>
            {/* <li className='nav-list'><a href='/JoinWithUsSupplier'>Join With Us</a></li> */}
          </ul> 
      </nav>
    </div>
  )
}

export default Navbar;
