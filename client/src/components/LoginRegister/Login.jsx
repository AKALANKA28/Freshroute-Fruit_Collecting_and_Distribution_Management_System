import React from 'react'
import './loginregister.css'
import { Link, NavLink } from 'react-router-dom'

import video from '../../assests/video.mp4'
import logo from '../../assests/logo.png'
import Container from '../../Website/Container'


const login = () => {
  return (


    <Container class1="wrapper">
    <div class="login-main">
        <div class="login-row">
            <div class="col-md-6 side-video">
                       
                {/* <!-------------      image     -------------> */}

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
            <div class="col-md-6 right">
                
                <div class="input-box">
               <img src={logo} alt='Logo Image'className='login-img'/> 

                   <h4>Welcome Back!</h4>
                   {/* <span className='showMessage'>Login status will go here</span> */}
                   {/* <div class="sign-in-options">
                        <div class="signin">
                            <a href="#" class="google"><i class="fab fa-google"></i> Sign in with Google</a>
                            <a href="#" class="facebook"><i class="fab fa-facebook"></i> Sign in with Facebook</a>
                        </div>
                    </div> */}
                   <form action="">
                      <div class="input-field">
                            <input type="text" class="input" id="email" required="" autocomplete="off"/>
                            <label for="email">Email</label> 
                      </div> 
                      <div class="input-field">
                            <input type="password" class="input" id="pass" required=""/>
                            <label for="pass">Password</label>
                        </div> 
                      <div class="input-field">  
                            <input type="submit" class="submit" value="Log in"/>
                      </div> 
                   </form>
                  
                   <div class="signin">
                    <span> Forgot your password? <a href="#">Click Here</a></span>
                   </div>
                </div>  
            </div>
        </div>
    </div>
</Container>

  )
}

export default login