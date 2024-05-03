import React, { useEffect, useState } from "react";
import "./cart.css";
import img from "../../assets/image1.jpg";
import { Link } from "react-router-dom";
import Container from "../../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeProductFromCart,
  updateProductFromCart,
} from "../../../features/user/userSlice";
import { ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import Navbar2 from "../../Navbar/Navbar2";

const Cart = () => {

  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const config2 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};



  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  console.log(productUpdateDetail);

  const userCartState = useSelector((state) => state.auth.cartProducts);
  useEffect(() => {
    dispatch(getCart());
  }, []);

  // useEffect(() => {
  //   if (productUpdateDetail !== null)
  //     dispatch(
  //       updateProductFromCart({
  //         cartItemId: productUpdateDetail?.cartItemId,
  //         quantity: productUpdateDetail?.quantity,
  //       })
  //     );
  //   setTimeout(() => {
  //     dispatch(getCart());
  //   }, 200);
  // }, [productUpdateDetail]);


  const deleteACartProduct = (id) => {
    dispatch(removeProductFromCart(id));
    setTimeout(() => {
      dispatch(getCart());
    }, 300);
  };



  // const userCartState = useSelector((state) => state.auth.cartProducts);
  // useEffect(() => {
  //   dispatch(getCart(config2));
  // }, []);

  //update cart product
  useEffect(() => {
    if (productUpdateDetail !== null)
      dispatch(
        updateProductFromCart({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
    setTimeout(() => {
      dispatch(getCart(config2));
    }, 200);
  }, [productUpdateDetail]);

  //delete cart product
  // const deleteACartProduct = (id) => {
  //   dispatch(removeProductFromCart({id:id, config2:config2}));
  //   setTimeout(() => {
  //     dispatch(getCart(config2));
  //   }, 300);
  // };

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

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51P85tiKciT9oiVpgZ0v6tWCBKxPZKw7UOl9hOeK44Ce25o4wkz4gIPtvcMvWGfYfbSINuAgMYAO3dn5w41GZsVli00WkqVK56w"
    );
    const body = {
      products: userCartState,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await fetch("http://localhost:8070/user/order/checkout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    const session = await res.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
    }
  };

  return (
    <>
    <Navbar2 />
      {/* <div className="product-header">
        <nav className="nav">
          <div className="nav-logo">
            <a href="/">FreshRoute.</a>
          </div>
          <ul className="nav-menu">
            <li className="nav-list">
              <a href="/">Home</a>
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
      </div> */}
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Fruit</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center border-bottom"
                  >
                    <div className="cart-col-1 d-flex align-items-center gap-5">
                      <div className="w-25">
                        <img
                          src={item?.productId.images}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="w-75">
                        <p>{item?.productId.title}</p>
                        <p>Grade: </p>
                        {/* <li style={{fruitGrade: item?.grade.title}}></li> */}
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">Rs.{item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-3">
                      <input
                        type="number"
                        className="form-control f-control"
                        name={"quantity"+item?._id}
                        min={1}
                        max={100}
                        id={"cart"+item?._id}
                        value={
                         item?.quantity
                        }
                        onChange={(e) => {
                          setProductUpdateDetail({
                            cartItemId: item?._id,
                            quantity: e.target.value,
                          });
                        }}
                      />

                      <div>
                        <i
                          onClick={() => {
                            deleteACartProduct(item?._id);
                          }}
                          className="bi bi-trash3 text-danger"
                        ></i>
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        Rs.{item?.price * item.quantity}
                      </h5>
                    </div>
                  </div>
                );
              })}

            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/shop" className="product-button">
                  Continue Shopping
                </Link>
                {(totalAmount !== null || totalAmount !== 0) && (
                  <div className="d-flex flex-column align-items-end">
                    <h4>SubTotal: Rs.{totalAmount}</h4>
                    <p>Taxes and shipping calculate at checkout</p>
                    {/* <button onClick={makePayment} className="product-button">
                      Checkout
                    </button> */}
                    <Link to="/checkout" className="product-button">
                    Checkout
                  </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          // pauseOnFocusLoss
          // draggable
          pauseOnHover
          theme="light"
          // transition: Bounce
        />
        {/* Same as */}
        <ToastContainer />
      </Container>
    </>
  );
};

export default Cart;
