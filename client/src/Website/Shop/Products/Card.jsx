import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./products.css";

import { addToCart } from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const getProductId = useLocation().pathname.split("/")[2];
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const cartState = useSelector((state) => state.auth.cartProducts);
  const productState = useSelector((state) => state.product.singleproduct);

  useEffect(() => {
    if (cartState) {
      for (let index = 0; index < cartState.length; index++) {
        if (getProductId === cartState[index]?.productId?._id) {
          setAlreadyAdded(true);
          break; // Add break to exit loop once the condition is met
        }
      }
    }
  }, [cartState, getProductId]);

  const uploadCart = () => {
    dispatch(
      addToCart({ productId: productState?._id, quantity, price: productState?.price })
    );
  };

  return (
    <>
      {Array.isArray(data) &&
        data.map((item, index) => (
          <div className="col-3" style={{ width: "23.7%" }} key={index}>
            <div className="product-card position-relative">
              {/* <div className="wishlist-icon position-absolute">
                <Link to={"/shop/" + item?._id}>
                  <i className="bi bi-heart"></i>
                </Link>
              </div> */}
              <div>
              <div className="product-img d-flex justify-content-center align-items-center">
                  <img
                    src={item?.images}
                    alt=""
                    className="img-fluid d-block"
                    style={{ width: "100%", height: "100%" }} 
                    onClick={() => navigate("/shop/" + item?._id)}

                  />
                </div>
              </div>

              <div className="product-details p-3">
                <h5 className="product-title mt-3">{item?.title}</h5>
                <h6 className="category">{item?.category}</h6>
                <p className="stock">
                  {/* Available Stock<span> 10000</span> */}
                </p>
                <p className="price">
                  Rs {item?.price}
                  <span> / per kg ( A)</span>
                </p>
                {/* <div className={alreadyAdded ? "ms-0" : "ms-5" + "d-flex align-items-center gap-2 mb-2"}>
                  <button
                    className="p-button"
                    type="submit"
                    onClick={() => {
                      alreadyAdded ? navigate("../cart") : uploadCart();
                    }}
                  >
                    Add to Cart
                  </button>
                  <button className="p-button buy" type="submit">
                    Buy Now
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Card;
