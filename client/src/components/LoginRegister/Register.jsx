import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import video from "../../assests/video.mp4";
import logo from "../../assests/logo.png";
import Container from "../../Website/Components/Container";
import "./loginregister.css";
import { registerUser } from "../../features/user/userSlice";

const registerSchema = yup.object({
  name: yup.string().required("Username is Required"),
  email: yup
    .string()
    .nullable()
    .email("Email Should be Valid")
    .required("Email is Required"),
  // mobile: yup
  //   .string()
    // .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Please enter a valid phone number")
    // .required("A phone number is required"),
  password: yup.string().required("Password is required"),
});

const Register = () => {
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      // mobile: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  useEffect(() => {
    if(authState.createdUser == null & authState.isSuccess == true){
      navigate('/login')
    }
  }, [authState])

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

              <div className="footerDiv flex">
                <span className="text">Have an account?</span>
                <Link to={"/login"}>
                  <button className="btn">Sign In</button>
                </Link>
              </div>
            </div>
            <div class="col-md-6 right">
              <div class="input-box">
                <img src={logo} alt="Logo Image" className="login-img" />

                <h4>Welcome Back!</h4>
                {/* <span className='showMessage'>Login status will go here</span> */}
                {/* <div class="sign-in-options">
                        <div class="signin">
                            <a href="#" class="google"><i class="fab fa-google"></i> Sign in with Google</a>
                            <a href="#" class="facebook"><i class="fab fa-facebook"></i> Sign in with Facebook</a>
                        </div>
                    </div> */}
                <form action="" onSubmit={formik.handleSubmit}>
                  <div class="input-field">
                    <input
                      type="text"
                      className="input"
                      id="username"
                      required=""
                      autocomplete="on"
                      value={formik.values.name}
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                    />
                    <div className="error">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                    <label htmlFor="username">Username</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="email"
                      required=""
                      autocomplete="off"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <label htmlFor="email">Email</label>
                  </div>
                  {/* <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="mobile"
                      required=""
                      autocomplete="off"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                    <label htmlFor="mobile">Mobile</label>
                  </div> */}
                  <div className="input-field">
                    <input
                      type="password"
                      className="input"
                      id="pass"
                      required=""
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                    />
                    <div className="error">
                      {formik.touched.password && formik.errors.password}
                    </div>
                    <label htmlFor="pass">Password</label>
                  </div>
                  <div className="input-field">
                    <input type="submit" className="submit" value="Sign Up" />
                  </div>
                </form>

               
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
  );
};

export default Register;
