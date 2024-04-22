import React, { useEffect, useState } from "react";
import "./products.css";
import img from "../../assets/image1.jpg";
import Footer from "../../Footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../../features/products/productSlice";
import { ToastContainer } from "react-toastify";
import { addToCart, getCart } from "../../../features/user/userSlice";
import Navbar from "../../Navbar/Navbar";
// import Grades from "../../Components/Grades";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  // const [grade, setGrade] = useState(1);

  const [alreadyAdded, setAlreadyAdded] = useState(false)
  // console.log(quantity);
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  // console.log(getProductId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productState = useSelector( state => state.product.singleproduct);
  const cartState = useSelector(state => state.auth.cartProducts )

  useEffect(() => {
    dispatch(getSingleProduct(getProductId));
    dispatch(getCart())
  }, []);


  useEffect(() => {
    // Check if cartState is defined and not null before accessing its length
  if (cartState) {
    for (let index = 0; index < cartState.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }
}, [cartState]); // Add cartState to the dependency array of useEffect

  const uploadCart = () => {
    dispatch(
      addToCart({productId: productState?._id, quantity, price: productState?.price})
    )
    // navigate('./cart')
  };
  // console.log(uploadCart);

  return (
    <div>
      {/* <Navbar /> */}
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

      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <img src={img} alt="" />
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="">
                <h3 className="title">
                  {productState?.title} <span>| {productState?.category}</span>
                </h3>

                <div className="">
                  <p className="price pt-3">
                    {" "}
                    Rs. {productState?.price} <span>/Per kg</span>
                  </p>
                </div>
                <div className="py-3">
                  <div className="d-flex flex-column gap-2 pb-4">
                    <h3 className="product-heading">Description</h3>
                    <p className="product-description">
                      Latin words, combined with a handful of model sentence
                      structures, to generate Lorem Ipsum which looks
                      reasonable. aLatin words, cobined with a handful of model
                      sentence structures, to generate Lorem Ipsum which looks
                      reasonable. Latin words, combined with a handful of model
                      sentence structures, to generate Lorem Ipsum which looks
                      reasonable. aLatin words, cobined with a handful of model
                      sentence structures, to generate Lorem Ipsum which looks
                      reasonable.
                    </p>
                  </div>
                  {
                    alreadyAdded === false && <>
                    <div className="d-flex flex-column gap-2 pb-4">
                    <h3 className="product-heading">Grade</h3>
                    {/* <Grades setGrade = {setGrade} gradeData={productState?.grade}/> */}
                    <div className="d-flex flex-wrap gap-15 grade">
                      <span className="badge border border-1 text-dark p-3 button-select">
                        A
                      </span>
                      <span className="badge border border-1 text-dark p-3">
                        B
                      </span>
                      <span className="badge border border-1 text-dark p-3">
                        C
                      </span>
                    </div>
                  </div>
                    </>
                  }
                  <div className=" d-flex align-items-center gap-3 pb-4">
                   {
                    alreadyAdded === false && <>
                     {/* <h3 className='product-heading'>Quantity</h3> */}
                     <div className="">
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        className="form-control"
                        style={{ width: "70px", height: "40px" }}
                        id=""
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      />
                    </div>
                    </>
                   }
                    <div className={alreadyAdded? "ms-0" : "ms-5" + "d-flex align-items-center gap-2"}>
                      <button
                        className="product-button"
                        type="submit"
                        onClick={() => { alreadyAdded? navigate('../cart') : uploadCart()}}
                      >
                        {alreadyAdded?"Go To Cart" : "Add to Cart"}
                      </button>
                      <button className="product-button buy" type="submit">
                        Buy Now
                      </button>
                    </div>
                  </div>

                  {/* <div className="d-flex flex-column gap-1 border-bottom my-3">
                      <h3 className='product-heading'>Shipping & Returns: </h3>
                      <p className='product-description'>
                      Free Shipping and returns available on all orders! <br/>
                      We ship all the purchased orders within 
                      <b> 1-2 days!</b>
                      </p>
                  </div> */}
                </div>

                <div className="d-flex flex-column my-3">
                  <div
                    className="accordion border-bottom pb-2"
                    id="accordionShipping"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingShipping">
                        <button
                          className="accordion-button accordion-heading"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseShipping"
                          aria-expanded="false"
                          aria-controls="collapseShipping"
                        >
                          <i className="bi bi-truck accordion-icon"></i>{" "}
                          Shipping & Returns
                        </button>
                      </h2>
                      <div
                        id="collapseShipping"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingShipping"
                        data-bs-parent="#accordionShipping"
                      >
                        <div className="accordion-body p-0 pt-3">
                          <p className="product-description">
                            Free Shipping and returns available on all orders!{" "}
                            <br />
                            We ship all the purchased orders within{" "}
                            <b>1-2 days!</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="accordion pt-2 pb-2 border-bottom"
                    id="accordionGrades"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingGrades">
                        <button
                          className="accordion-button accordion-heading"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseGrades"
                          aria-expanded="false"
                          aria-controls="collapseGrades"
                        >
                          <i className="bi bi-arrow-repeat accordion-icon"></i>{" "}
                          Grades
                        </button>
                      </h2>
                      <div
                        id="collapseGrades"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingGrades"
                        data-bs-parent="#accordionGrades"
                      >
                        <div className="accordion-body p-0">
                          <div className="table-responsive">
                            <table className="table table-striped table-hover table-borderless table-primary align-middle">
                              <thead className="table-light">
                                <tr>
                                  <th></th>
                                  <th>A</th>
                                  <th>B</th>
                                  <th>C</th>
                                </tr>
                              </thead>
                              <tbody className="table-group-divider">
                                <tr className="table-primary">
                                  <td scope="row">Item</td>
                                  <td>Item</td>
                                  <td>Item</td>
                                  <td>Item</td>
                                </tr>
                                <tr className="table-primary">
                                  <td scope="row">Item</td>
                                  <td>Item</td>
                                  <td>Item</td>
                                  <td>Item</td>
                                </tr>
                              </tbody>
                              <tfoot></tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="accordion pt-2" id="accordionFaq">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFaq">
                        <button
                          className="accordion-button accordion-heading"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFaq"
                          aria-expanded="false"
                          aria-controls="collapseFaq"
                        >
                          <i className="bi bi-check2 accordion-icon"></i> Faq
                        </button>
                      </h2>
                      <div
                        id="collapseFaq"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFaq"
                        data-bs-parent="#accordionFaq"
                      >
                        <div className="accordion-body p-0 pt-3">
                          {/* Accordion body content */}
                        </div>
                      </div>
                    </div>
                  </div>
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
      <Footer />
    </div>
  );
};

export default SingleProduct;
