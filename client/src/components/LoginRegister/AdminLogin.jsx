import React, { useEffect } from "react";
import "./loginregister.css";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";

import video from "../../assests/video.mp4";
import logo from "../../assests/logo.png";

import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Container from "../../Website/Components/Container";
import { login } from "../../features/admin/adminSlice";


const AdminLogin = () => {
  // const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let adminSchema = yup.object({
    email: yup.string().nullable().email("Email Should be Valid").required('Email is required'),
    password: yup.string().required("Password is required"),
  });
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: adminSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      // (JSON.stringify(values, null, 2));
    },
  });


  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)
  useEffect(() => {
    if(user){
      navigate("/finance")
    }else{
      navigate("/finance")
    }
  },[navigate, isSuccess])

  // const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)
  // useEffect(() => {
  // if (user){
  //   if(user.second_role === "finance_manager"){
  //     navigate("/finance")
  //   }
  //   else if(user.second_role === "supplier_manager"){
  //     navigate("/SMDashboard")
  //   } else if (user.second_role === "coordinator") {
  //     navigate("/sales")
  //   } else if (user.second_role === "transport_manager") {
  //     navigate("/sales")
  //   }else if (user.second_role === "staff_manager") {
  //     navigate("/sales")
  //   }else if (user.second_role === "buyer_manager") {
  //     navigate("/sales")
  //   }else if (user.second_role === "order_manager") {
  //     navigate("/sales")
  //   }else if (user.second_role === "rp_manager") {
  //     navigate("/sales")
  //   } else{
  //     navigate("/finance")
  //   }
  // }
       

  // },[navigate, isSuccess])

  // const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)
  // useEffect(() => {
  //   if(user) {
  //     if(user.second_role === "supplier_manager"){
  //       navigate("/finance")
  //     } else if (user.second_role === "coordinator" || user.second_role === "transport_manager" || user.second_role === "staff_manager" || user.second_role === "buyer_manager" || user.second_role === "order_manager" || user.second_role === "rp_manager") {
  //       navigate("/sales")
  //     } else {
  //       navigate("/") // Handle default case here
  //     }
  //   }
  // }, [user, navigate, isSuccess]);
  
  // useEffect(() => {
  //   if(user.second_role == "supplier_manager"){
  //     navigate("/finance")
  //   }else if (user.second_role === "coordinator") {
  //     navigate("/sales")
  //   }else if (user.second_role === "supplier_manager") {
  //     navigate("/sales")
  //   }else if (user.second_role === "transport_manager") {
  //     navigate("/sales")
  //   }else if (user.second_role === "staff_manager") {
  //     navigate("/sales")
  //   }else if (user.second_role === "buyer_manager") {
  //     navigate("/sales")
  //   }else if (user.second_role === "order_manager") {
  //     navigate("/sales")
  //   }else if (user.second_role === "rp_manager") {
  //     navigate("/sales")
  //   }else{
  //     navigate("")
  //   }
  // },[navigate, isSuccess])
  



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

              {/* <div className="footerDiv flex">
                <span className="text">Don't have an account?</span>
                <Link to={"/register"}>
                  <button className="btn">Sign Up</button>
                </Link>
              </div> */}
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
                      class="input"
                      id="email"
                      required=""
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
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
                    <div className="error">
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

export default AdminLogin;
