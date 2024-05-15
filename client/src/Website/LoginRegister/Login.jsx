import React, { useEffect } from "react";
import "./loginregister.css";
import { Link, redirect, useNavigate } from "react-router-dom";

import video from "../../assests/video.mp4";
import logo from "../../assests/logo.png";

import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { useFormik } from "formik";
import Container from "../../Website/Components/Container";
import facebook from "../assets/facebook2.png";
console.log(facebook);
const loginSchema = yup.object({
  email: yup.string().nullable().email("Email Should be Valid"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      // navigate('/')
    },
  });

  useEffect(() => {
    if (authState.user !== null && authState.isSuccess == true) {
      navigate("/");
    }
  }, [authState]);

  // const authState = useSelector((state) => state);

  // const { user, isError, isSuccess, isLoading, message } = authState;

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate("/shop");
  //   } else {
  //     navigate("");
  //   }
  // }, [user, isError, isSuccess, isLoading]);
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
                  Log in to Access Freshness!
                </h2>
                <p>Unlock the Orchard</p>
              </div>

              <div className="footerDiv flex">
                <span className="text">Don't have an account?</span>
                <Link to={"/register"}>
                  <button className="btn">Sign Up</button>
                </Link>
              </div>
            </div>
            <div class="col-md-6 right d-flex flex-column">
              <div>
                <img
                  src={logo}
                  alt="Logo Image"
                  className="login-img"
                  style={{ marginTop: "-25px" }}
                />

                <h4>Welcome Back!</h4>
                {/* <span className='showMessage'>Login status will go here</span> */}
                {/* <div class="sign-in-options">
        <div class="signin">
            <a href="#" class="google"><i class="fab fa-google"></i> Sign in with Google</a>
            <a href="#" class="facebook"><i class="fab fa-facebook"></i> Sign in with Facebook</a>
        </div>
    </div> */}
              </div>
              <div className="d-flex justify-content-between gap-2">
                <button
                  className="login-with-google-btn"
                  onClick={loginwithgoogle}
                  style={{
                    backgroundImage:
                      " url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)",
                  }}
                >
                  Sign In With Google
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
                  Sign In With Facebook
                </button>
              </div>
              <div class="input-box mt-5">
                <form action="" onSubmit={formik.handleSubmit}>
                  <div class="input-field">
                    <input
                      type="text"
                      class="input"
                      id="email"
                      required=""
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error" style={{marginTop:"-15px"}}>
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
                      onBlur={formik.handleBlur("password")}
                    />
                    <div className="error" style={{marginTop:"-15px"}}>
                      {formik.touched.password && formik.errors.password}
                    </div>
                    <label for="pass">Password</label>
                  </div>
                  <div class="input-field">
                    <input type="submit" class="submit" value="Log in" />
                  </div>
                </form>

                <div class="signin">
                  <span>
                    {" "}
                    Forgot your password? <a href="#">Click Here</a>
                  </span>
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
  );
};

export default Login;
