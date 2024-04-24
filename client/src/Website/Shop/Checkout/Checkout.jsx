import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/image1.jpg";
import "./checkout.css";
import Footer from "../../Footer/Footer";
import Container from "../../Components/Container";
// import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../../../Utils/Config";

const shippingSchema = yup.object({
  firstName: yup.string().required("First name is Required"),
  lastName: yup.string().required("Last name is Required"),
  address: yup.string().required("Address Details are Required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("country is required"),
  pincode: yup.string().required("Postal Code is required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state.auth.cartProducts);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, selectShippingInfo] = useState(null);
  const cartState = useSelector((state) => state.auth.cartProducts);

  //total amount
  useEffect(() => {
    let sum = 0;
    if (userCartState) {
      for (let index = 0; index < userCartState.length; index++) {
        sum =
          sum +
          Number(userCartState[index].quantity) * userCartState[index].price;
        setTotalAmount(sum);
      }
    }
  }, [userCartState]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      selectShippingInfo(values);
    },
  });

  // const makePayment = async () => {
  //     const stripe = await loadStripe(
  //       "pk_test_51P85tiKciT9oiVpgZ0v6tWCBKxPZKw7UOl9hOeK44Ce25o4wkz4gIPtvcMvWGfYfbSINuAgMYAO3dn5w41GZsVli00WkqVK56w"
  //     );
  //     const body = {
  //         // products: carts
  //     }
  //     const headers = {
  //         "Content-Type" : "application/json"
  //     }

  //     const res = await fetch("", {
  //         method: "POST",
  //         headers: headers,
  //         body: JSON.stringify(body)
  //     })
  //     const session = await res.json();

  //     const result = stripe.redirectToCheckout({
  //         sessionId:session.id
  //     })

  //     if(result.error){

  //     }
  //   };

  const handleAddSubmit = async () => {
    try {
        const orderDetail = {
            ...formik.values,
            totalAmount: totalAmount,
            cartProducts: cartState,
        };
        const response = await axios.post('http://localhost:8070/user/order', orderDetail, config);
      alert("Order placed successfully");
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("Failed to place order");
    }
  };
  return (
    <div>
      <div className="product-header">
        <nav className="nav">
          <div className="nav-logo">
            <a href="/home">FreshRoute.</a>
          </div>
          <ul className="nav-menu">
            <li className="nav-list">
              <a href="/home">Home</a>
            </li>
            <li className="nav-list">
              <a href="/about">About</a>
            </li>
            <li className="nav-list">
              <a href="/shop">Shop</a>
            </li>
            <li className="nav-list">
              <a href="/contact">Contact</a>
            </li>
            <li className="nav-login">
              <Link to="/Login">
                <span>Login</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="chekout-left-data">
              <h3 className="website-name">FreshRoute</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link
                      to="/cart"
                      className="text-dark text-decoration-none total-price"
                    >
                      Cart
                    </Link>
                  </li>

                  <li className="breadcrumb-item total-price">Information</li>
                  <li className="breadcrumb-item total-price">Shipping</li>
                  <li className="breadcrumb-item total-price">Payment</li>
                </ol>
              </nav>
              <h4 className="title mt-5">Contact Information</h4>
              <p className="user-details">
                Nethmina Akalanka (nethminaakalanka@gmail.com)
              </p>
              <h4 className=" mt-4 mb-3 title">Shipping Address</h4>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
                onSubmit={formik.handleSubmit}
              >
                <div className="w-100">
                  <select
                    name="country"
                    id=""
                    className="form-control form-select"
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleChange("country")}
                    value={formik.values.country}
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="Sri Lanka">Sri Lanka</option>
                  </select>
                  <div className="error">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleChange("firstName")}
                    value={formik.values.firstName}
                  />
                  <div className="error">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleChange("lastName")}
                    value={formik.values.lastName}
                  />
                  <div className="error">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleChange("address")}
                    value={formik.values.address}
                  />
                  <div className="error">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Warehouse, Store, etc"
                    className="form-control"
                    name="other"
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleChange("other")}
                    value={formik.values.other}
                  />
                  <div className="error">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleChange("city")}
                    value={formik.values.city}
                  />
                  <div className="error">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="state"
                    id=""
                    className="form-control form-select"
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleChange("state")}
                    value={formik.values.state}
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Western" selected disabled>
                      Select State
                    </option>
                  </select>
                  <div className="error">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    name="pincode"
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleChange("pincode")}
                    value={formik.values.pincode}
                  />
                  <div className="error">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>

                <div className="w-100 mt-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <Link to="/cart" className="text-dark text-decoration-none">
                      <i class="bi bi-chevron-left me-2"></i>Back to cart
                    </Link>
                    {/* <Link to='/payment' className='product-button'>Continue to Payment</Link> */}
                    {/* <button to={makePayment} className='product-button'>Continue to Shipping</button> */}
                    <button
                      onClick={() => handleAddSubmit()}
                      type="submit"
                      className="product-button"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="chekout-right-data">
              <div className="border-bottom py-4">
                {cartState &&
                  cartState?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-5 align-items-center"
                      >
                        <div className="w-75 d-flex gap-3 mt-3">
                          <div className="w-25 position-relative">
                            <span
                              style={{
                                top: "-15px",
                                left: "75px",
                                padding: "10px 15px",
                              }}
                              className="badge bg-secondary text-white rounded-circle  position-absolute"
                            >
                              {item?.quantity}
                            </span>
                            <img src={item?.productId?.images} alt="img" className="img-fluid" />
                          </div>
                          <div>
                            <div className="title">
                              {" "}
                              {item?.productId?.title}
                            </div>
                            <p className="total-price">A /{item?.quantity}kg</p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <p className="total">
                            Rs {item?.price * item?.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal:</p>
                  <p className="total-price">
                    Rs. {totalAmount ? totalAmount : "0"}.00
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Tax</p>
                  <p className="mb-0 total-price">2%</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4 ">
                <h4 className="total">Total</h4>
                <h4 className="total-price ">
                  Rs. {totalAmount ? totalAmount * 0.02 + totalAmount : "0"}.00
                </h4>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Checkout;
