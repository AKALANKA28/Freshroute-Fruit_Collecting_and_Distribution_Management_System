import React, { useEffect } from 'react'
import './loginregister.css'
import { Link, redirect, useNavigate } from 'react-router-dom'

import video from '../../assests/video.mp4'
import logo from '../../assests/logo.png'

import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';
import { useFormik } from 'formik'
import Container from '../../Website/Components/Container'
import { login } from '../../features/admin/adminSlice'



const adminSchema = yup.object({
  email: yup.string().nullable().email("Email Should be Valid"),
  password: yup.string().required("Password is required"),
});

const AdminLogin = () => {
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: adminSchema,
    onSubmit: (values) => {
      dispatch(login(values))
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)
  useEffect(() => {
    if(user){
      navigate("/finance")
    }else{
      navigate("/admin")
    }
  },[navigate, isSuccess])



  // const authState = useSelector((state) => state);

  // const { user, isError, isSuccess, isLoading, message } = authState;



  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate("/shop");
  //   } else {
  //     navigate("");
  //   }
  // }, [user, isError, isSuccess, isLoading]);

  return (

    <>
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
                   <form 
                    action=""
                    onSubmit={formik.handleSubmit}>
                    
                      <div class="input-field">
                            <input 
                             type="text" 
                             class="input" 
                             id="email" 
                             required="" 
                             value={formik.values.email}
                             onChange={formik.handleChange("email")}
                             onBlur={formik.handleBlur("email")}/>
                             <div className='error'>
                                {formik.touched.email && formik.errors.email}
                             </div>
                            <label for="email">Email</label> 
                      </div> 
                      <div class="input-field">
                            <input 
                             type="password" 
                             class="input" 
                             id="pass" 
                             required=""
                             value={formik.values.password}
                             onChange={formik.handleChange("password")}
                             onBlur={formik.handleBlur("password")}/>
                             <div className='error'>
                                {formik.touched.password && formik.errors.password}
                             </div>
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
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      // transition: Bounce
      />
      {/* Same as */}
    <ToastContainer />

    </>
   
    

  )
}

export default AdminLogin