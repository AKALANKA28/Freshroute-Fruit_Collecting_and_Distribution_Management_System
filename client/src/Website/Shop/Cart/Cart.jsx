import React, { useEffect, useState } from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import Container from "../../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeProductFromCart,
  updateProductFromCart,
} from "../../../features/user/userSlice";
import { ToastContainer } from "react-toastify";
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

  const deleteACartProduct = (id) => {
    dispatch(removeProductFromCart(id));
    setTimeout(() => {
      dispatch(getCart());
    }, 300);
  };

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
      dispatch(getCart());
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

  return (
    <>
      <Navbar2 />

      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header d-flex justify-content-between align-items-center ">
              <h4 className="cart-col-1 text-bold">Fruit</h4>
              <h4 className="cart-col-2 text-bold">Price (Rs)</h4>
              <h4 className="cart-col-3 text-bold">Quantity (Kg)</h4>
              <h4 className="cart-col-4 text-bold">Total</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-2 mb-2 d-flex justify-content-between align-items-center border-bottom"
                  >
                    <div className="cart-col-1 d-flex align-items-center gap-5">
                      <div className="w-25">
                        <img
                          src={item?.productId?.images}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="w-75">
                        <p>{item?.productId.title}</p>
                        <p>Grade: {item?.grade?.title}</p>
                        {/* <li style={{fruitGrade: item?.grade.title}}></li> */}
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">Rs.{item?.price}</h5>
                    </div>
                    <div
                      className="cart-col-3 "
                      style={{ border: "1px solid #31572c", padding:"2px 5px", borderRadius:"20px" }}
                    >
                      <div className="d-flex align-items-center justify-content-center gap-1">
                      <div>
                        <i
                          className="bi bi-dash text-dark"
                          onClick={() => {
                            const newQuantity = Math.max(
                              parseInt(
                                productUpdateDetail?.quantity || item?.quantity
                              ) - 1,
                              1
                            );
                            setProductUpdateDetail(
                              (prevProductUpdateDetail) => ({
                                ...prevProductUpdateDetail,
                                quantity: newQuantity.toString(),
                              })
                            );
                          }}
                        ></i>
                      </div>
                      <input
                        type="number"
                        className="form-control form-quantity border-0 text-center"
                        style={{width:"50%"}}
                        name=""
                        min={1}
                        max={1000}
                        id=""
                        value={
                          productUpdateDetail?.quantity !== undefined
                            ? productUpdateDetail?.quantity
                            : item?.quantity
                        }
                        onChange={(e) => {
                          setProductUpdateDetail({
                            ...productUpdateDetail,
                            quantity: e.target.value,
                          });
                        }}
                        readOnly
                      />
                      <div>
                        <i
                          className="bi bi-plus text-dark"
                          onClick={() => {
                            const newQuantity =
                              parseInt(
                                productUpdateDetail?.quantity || item?.quantity
                              ) + 1;
                            setProductUpdateDetail(
                              (prevProductUpdateDetail) => ({
                                ...prevProductUpdateDetail,
                                quantity: newQuantity.toString(),
                              })
                            );
                          }}
                        ></i>
                      </div>
                  
                      </div>
                      

                    </div>
                    <div>
                        <i
                          onClick={() => {
                            deleteACartProduct(item?._id);
                          }}
                          className="bi bi-trash3 text-danger"
                        ></i>
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
                    <h4 className="fw-bolder">
                      <span className="" style={{fontSize:"19px"}}>Sub Total:</span> Rs.
                      {totalAmount}.00
                    </h4>
                    <p className="" style={{ fontWeight: "400" }}>
                      Taxes calculate at checkout
                    </p>
                    {/* <button onClick={makePayment} className="product-button">
                      Checkout
                    </button> */}
                    <Link to="/checkout" className="product-button bg-dark">
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
