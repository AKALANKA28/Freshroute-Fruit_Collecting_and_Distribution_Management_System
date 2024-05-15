import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./checkout.css";
import Footer from "../../Footer/Footer";
import Container from "../../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Navbar2 from "../../Navbar/Navbar2";
import { createAnOrder, emptyCart } from "../../../features/user/userSlice";
import Badge from "@mui/material/Badge";

const Checkout = () => {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state.auth);
  const [cartProductState, setCartProductState] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Calculate total amount
    let sum = 0;
    if (cartState) {
      for (let index = 0; index < cartState.length; index++) {
        sum += Number(cartState[index].quantity) * cartState[index].price;
      }
      setTotalAmount(sum);
    }
  }, [cartState]);

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
    },
    validationSchema: yup.object({
      address: yup.string().required("Address is required"),
      state: yup.string().required("State is required"),
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
      pincode: yup.string().required("Pincode is required"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("address", JSON.stringify(values));
      setShippingInfo(JSON.parse(localStorage.getItem("address")));
    },
  });

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index]?.productId?._id,
        quantity: cartState[index]?.quantity,
        price: cartState[index]?.price,
        color: cartState[index]?.color?._id,
      });
    }
    setCartProductState(items);
  }, [cartState]);

  const clearCartAfterPayment = () => {
    dispatch(emptyCart()); // Dispatch the clearCart action
  };

  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51P85tiKciT9oiVpgZ0v6tWCBKxPZKw7UOl9hOeK44Ce25o4wkz4gIPtvcMvWGfYfbSINuAgMYAO3dn5w41GZsVli00WkqVK56w"
    );
  
    const body = {
      products: cartState,
    };
    const headers = {
      "Content-Type": "application/json",
    };
  
    const getToken = localStorage.getItem("customer")
      ? JSON.parse(localStorage.getItem("customer"))
      : null;
  
    const config = {
      headers: {
        Authorization: `Bearer ${getToken?.token}`,
        Accept: "application/json",
      },
    };
  
    const response = await fetch(
      "http://localhost:8070/user/create-checkout-session",
      {
        method: "POST",
        headers: {
          ...config.headers, // Merge config headers
          "Content-Type": "application/json", // Add Content-Type header
        },
        body: JSON.stringify(body),
      }
    );
  
    const session = await response.json();
  
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
  
    if (result.error) {
      console.log(result.error);
    } else {
      // Clear the cart after successful payment
      clearCartAfterPayment();
  
      // Dispatch the createAnOrder thunk with the order details
      dispatch(
        createAnOrder({
          user: authState.user._id,
          shippingInfo: {
            address: formik.values.address,
            city: formik.values.city,
            state: formik.values.state,
            apartment: formik.values.other,
            pincode: formik.values.pincode,
          },
          orderItems: cartProductState.map((item) => ({
            product: item.product,
            quantity: item.quantity,
            price: item.price,
          })),
          totalPrice: totalAmount,
        })
      );
    }
  };
  
  return (
    <div>
      <Navbar2 />

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

                  <li className="breadcrumb-item total-price text-dark">Information & Shipping</li>
                  {/* <li className="breadcrumb-item total-price">Shipping</li> */}
                  <li className="breadcrumb-item total-price">Payment</li>
                </ol>
              </nav>
              <h4 className="title mt-5">Contact Information</h4>
              <p className="user-details">
                {authState?.user?.name}
                <br />
                {authState?.user?.email}
                <br />
                {authState?.user?.mobile}
              </p>
              <h4 className=" mt-4 mb-3 title">Shipping Address</h4>
              {/* {authState?.user?.address} */}

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
                      Select Province
                    </option>
                    <option value="Western">Central</option>
                    <option value="Western">Eastern</option>
                    <option value="Western">North Central</option>
                    <option value="Western">Nothern</option>
                    <option value="Western">North Western</option>
                    <option value="Western">Sabaragamuwa</option>
                    <option value="Western">Uva</option>
                    <option value="Western">Western</option>
                    <option value="Western">Western</option>
                  </select>
                  <div className="error">
                    {formik.touched.country && formik.errors.country}
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
                    placeholder="Landmark (Optional)"
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
                {/* <div className="flex-grow-1">
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
                </div> */}

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

                    <button
                      onClick={makePayment}
                      type="submit"
                      className="product-button"
                      // disabled={!formik.isValid} // Disable the button if form is not valid

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
                           

                            <Badge
                              className="cart-badge"
                              badgeContent={item?.quantity}
                              color="primary"
                            >
                              <img
                                src={item?.productId?.images}
                                alt="img"
                                className="img-fluid"
                              />{" "}
                            </Badge>
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
                  <p className="total text-dark fw-bold">Subtotal:</p>
                  <p className="total-price">
                    Rs. {totalAmount ? totalAmount : "0"}.00
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total text-dark fw-bold">Tax:</p>
                  <p className="mb-0 total-price">2%</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4 ">
                <h4 className="total text-dark fw-bold fs-5">Total:</h4>
                <h4 className="total-price text-dark fw-bold fs-5">
                  Rs. {totalAmount ? totalAmount * 0.02 + totalAmount : "0"}.00
                </h4>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default Checkout;
