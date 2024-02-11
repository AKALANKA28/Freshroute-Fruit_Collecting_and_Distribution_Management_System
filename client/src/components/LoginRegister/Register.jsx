import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import video from '../../assests/video.mp4'


const register = () => {
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
                        <span className='text'>Have an account?</span>
                        <Link to={'/'}>
                        <button className='btn'>Login</button>
                        </Link>
                    </div>
                                
                </div>
                <div className="col-mg-6 right">
                <div className='formDiv flex'>
          <div className='headerDiv'>
        {/*<img src={logo} alt='Logo Image'/> */}
            <h3>Welcome Back!</h3>
          </div>
          
          <form actionn="" className='form grid'>
            <span className='showMessage'>Login status will go here</span>

            <div className='inputDiv'>
              <label htmlFor='email'>Email</label>
              <div className='input flex'>
          
                <input type='email' id='email' placeholder='Enter Email'/>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='password'>Username</label>
              <div className='input flex'>
               
                <input type='text' id='Username' placeholder='Enter Username'/>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='password'>Password</label>
              <div className='input flex'>
               
                <input type='password' id='password' placeholder='Enter Password'/>
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Register</span>
             
            </button>
            <span className='forgotPassword'>
              Forgot your password? <a href=''>Click Here</a>
            </span>
          </form>

          
        </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default register
