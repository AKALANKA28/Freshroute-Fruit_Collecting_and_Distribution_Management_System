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
import facebook from "../assets/facebook2.png";

const registerSchema = yup.object({
  name: yup.string().required("Username is Required"),
  email: yup
    .string()
    .nullable()
    .email("Email Should be Valid")
    .required("Email is Required"),
  mobile: yup
    .string()
  .matches(/^(?:[0-9] ?){6,14}[0-9]$/, "Enter a valid number")
  .required("Required"),
  password: yup.string().required("Password is required"),
});

const Register = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  useEffect(() => {
    if ((authState.createdUser == null) & (authState.isSuccess == true)) {
      navigate("/login");
    }
  }, [authState]);

  const loginwithgoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };

  return (
    <>
      <Container class1="wrapper">
        <div class="login-main">
          <div class="login-row">
            <div class="col-md-6 side-video">
              {/* <!-------------      image     -------------> */}

              <video src={video} autoPlay muted loop></video>

              <div className="textDiv">
                <h2
                  className="title"
                  style={{ fontSize: "30px", color: "#FFFFFF" }}
                >
                  Join with us to Access Freshness!
                </h2>
                <p>Unlock the Orchard</p>
              </div>

              <div className="footerDiv flex">
                <span className="text">Have an account?</span>
                <Link to={"/login"}>
                  <button className="btn">Sign In</button>
                </Link>
              </div>
            </div>
            <div class="col-md-6 right  d-flex flex-column">
              <div>
                <img
                  src={logo}
                  alt="Logo Image"
                  className="login-img"
                  style={{ marginTop: "-25px" }}
                />

                <h4 className="mt-5">Join With Us</h4>
                {/* <span className='showMessage'>Login status will go here</span> */}
                {/* <div class="sign-in-options">
        <div class="signin">
            <a href="#" class="google"><i class="fab fa-google"></i> Sign in with Google</a>
            <a href="#" class="facebook"><i class="fab fa-facebook"></i> Sign in with Facebook</a>
        </div>
    </div> */}
              </div>

              {/* <span className='showMessage'>Login status will go here</span> */}
              {/* <div class="sign-in-options">
                        <div class="signin">
                            <a href="#" class="google"><i class="fab fa-google"></i> Sign in with Google</a>
                            <a href="#" class="facebook"><i class="fab fa-facebook"></i> Sign in with Facebook</a>
                        </div>
                    </div> */}
              <div className="d-flex justify-content-between gap-2">
                <button
                  className="login-with-google-btn"
                  onClick={loginwithgoogle}
                  style={{
                    backgroundImage:
                      " url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)",
                  }}
                >
                  Sign Up With Google
                </button>
                <button
                  className="login-with-google-btn"
                  onClick={loginwithgoogle}
                  style={{
                    backgroundImage: `url(${facebook})`,
                    backgroundSize: "25px",
                    backgroundPositionY: "7px",
                  }}
                >
                  Sign Up With Facebook
                </button>
              </div>
              <div class="input-box mt-5">
                <form action="" onSubmit={formik.handleSubmit}>
                
                  <div className="row">
                    <div className="d-flex align-items-center justify-content-between">
                    <div class="input-field">
                    <input
                      type="text"
                      className="input"
                      id="username"
                      required=""
                      autocomplete="on"
                      style={{width:"190px"}}
                      value={formik.values.name}
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                    />
                    <div className="error" style={{marginTop:"-15px"}}>
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                    <label htmlFor="username">Username</label>
                  </div>
                      <div className="input-field" >
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
                        <div className="error" style={{marginTop:"-15px"}}>
                          {formik.touched.mobile && formik.errors.mobile}
                        </div>
                        <label htmlFor="mobile">Mobile</label>
                      </div>

                    
                    </div>
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
                    <div className="error" style={{marginTop:"-15px"}}>
                      {formik.touched.password && formik.errors.password}
                    </div>
                    <label htmlFor="pass">Password</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="submit"
                      className="submit mt-3"
                      value="Sign Up"
                    />
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
