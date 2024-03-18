import React from 'react'
import './loginregister.css'
import { Link, NavLink } from 'react-router-dom'

import video from '../../assests/video.mp4'


const login = () => {
  return (
    <div className='wrapper'>
        <div className="container ">
            <div className="container-row">
                <div className="col-md-6 side-video">
               
                    <video src={video} autoPlay muted loop></video>

                    <div className="textDiv">
                        <h2 className="title">Create Sell</h2>
                        <p>exmple text</p>
                    </div>

                    <div className='footerDiv flex'>
                        <span className='text'>Don't have an account?</span>
                        <Link to={'/register'}>
                        <button className='btn'>Sign Up</button>
                        </Link>
                    </div>
                    
                </div>
                <div className="col-mg-6 right">
                <div className='formDiv flex'>
          <div className='headerDiv'>
        {/*<img src={logo} alt='Logo Image'/> */}
            <h3>Welcome Back!</h3>
          </div>
          
          <from actionj="" className='form grid'>
            <span className='showMessage'>Login status will go here</span>

            <div className='inputDiv'>
              <label htmlFor='username'>Username</label>
              <div className='input flex'>
               
                <input type='text' id='username' placeholder='Enter Username'/>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='password'>Password</label>
              <div className='input flex'>
              
                <input type='password' id='password' placeholder='Enter Password'/>
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Login</span>
             
            </button>

            <span className='forgotPassword'>
              Forgot your password? <a href=''>Click Here</a>
            </span>

          </from>

          <Link to={'/finance'}>
            <button className='btn'>dashboard</button>
          </Link>

          <Link to={'/tdashboard'}>
            <button className='btn'>tranportdashboard</button>
          </Link>

          <Link to={'/coordinator'}>
            <button className='btn'>Coordinator DashBoard</button>
          </Link>
        </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default login
