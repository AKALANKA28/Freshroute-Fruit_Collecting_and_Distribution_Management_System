import React from "react";
import Navbar from "./Navbar/Navbar";
import Navbar2 from "./Navbar/Navbar2";

import Footer from "./Footer/Footer";

import "./website.css";
import Container from "./Components/Container";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createQuery } from "../features/contact/contactSlice";

import image1 from "./assets/contactpage2.jpg";
const contactSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .trim()
    .email("Email Should be Valid")
    .required("Email is Required"),
  mobile: yup
    .string()
    .trim()
    .matches(
      /^0[0-9]{9}$/,
      "Mobile number must start with 0 and be 10 digits in total"
    )
    .required("Mobile is required"),
  message: yup
    .string()
    .trim()
    .max(500, "Message must be at most 500 characters")
    .required("Message is required"),
});

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery(values));
    },
  });

  return (
    <div>
      <Navbar />
      {/* <Navbar2/> */}
      {/* <div className="product-header">
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
                </ul> 
            </nav>
            </div>   */}
      <div className="hero">
        <div>
          <img
            src={image1}
            className="background"
            style={{ top: "-180px" }}
          ></img>
        </div>
        <div className="container">
          <div className="col-lg-12">
            <div className="hero-text">
              <p className="text1 ">Contact</p>
              <p className="text2 fs-3">Reach out. We're here to help</p>
            </div>

            <div className="hero-dot-play">
              <ul className="hero-dots"></ul>
            </div>
          </div>
        </div>
      </div>
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 mt-5 ">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title mb-5 mt-5">
                  Get in touch with us
                </h3>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  method="post"
                  className="d-flex flex-column m-3 gap-15"
                >
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                    />
                    <div className="error">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="5"
                      placeholder="Message"
                      value={formik.values.message}
                      onChange={formik.handleChange("message")}
                      onBlur={formik.handleBlur("message")}
                    />
                    <div className="error">
                      {formik.touched.message && formik.errors.message}
                    </div>
                  </div>
                  <div>
                    <button className="button mb-2 mt-5 justify-content-end">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d990.3161028665752!2d80.02407676963402!3d6.858879999571241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTEnMzIuMCJOIDgwwrAwMScyOS4wIkU!5e0!3m2!1sen!2slk!4v1712777684232!5m2!1sen!2slk"
                  width="600"
                  height="450"
                  className="border-0 w-100 h-100"
                  allowFullScreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* <div className='d-flex flex-row align-items-center justify-content-between mt-4 lower-contact '>
                        <div className="col-sm-4">
                          <h6><i className="bi bi-geo-alt-fill me-3"></i>Address:</h6>
                          <p>718/5, Keremulla Road, Panagoda, Homagama</p>
                        </div>
                        <div className="col-sm-3">
                        <h6><i className="bi bi-envelope-fill me-3"></i>Email:</h6>
                        <p>info@freshroute.lk</p>
                        </div>
                        <div className="col-sm-3">
                        <h6><i className="bi bi-telephone-inbound-fill me-3"></i>Telephone:</h6>
                        <p>011 2 751 757</p>


                        </div>
                        
                    </div> */}
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

      <Footer />
    </div>
  );
};

export default Contact;
