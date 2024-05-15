import React, { useEffect, useState } from "react";
import "./products.css";
import img from "../../assets/image1.jpg";
import Footer from "../../Footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../../features/products/productSlice";
import { ToastContainer, toast } from "react-toastify";
import { addToCart, getCart } from "../../../features/user/userSlice";
import axios from "axios";
import Navbar2 from "../../Navbar/Navbar2";
import Grades from "../../Components/Grades";
// import Grades from "../../Components/Grades";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [grade, setGrade] = useState(null);
  const [productData, setProductData] = useState(null);

  const [alreadyAdded, setAlreadyAdded] = useState(false);
  // console.log(quantity);
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  // console.log(getProductId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleproduct);
  const cartState = useSelector((state) => state?.auth?.cartProducts);

  useEffect(() => {
    dispatch(getSingleProduct(getProductId));
    dispatch(getCart());
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("/FruitType/");
  //     // Assuming the response data is an array of product objects
  //     // Find the product with the matching ID and set it to the state
  //     const product = response.data.find(
  //       (product) => product.id === getProductId
  //     );
  //     setProductData(product);
  //   } catch (err) {
  //     console.error("Error fetching product data:", err);
  //   }
  // };

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

  console.log(productState);

  const uploadCart = () => {
    if (grade === null) {
      toast.error("Please choose a Grade");
      return;
    } else {
      dispatch(
        addToCart({
          productId: productState?._id,
          quantity,
          price: productState?.price,
          grade: grade,
        })
      );
    }
    // navigate('../cart')
  };
  // console.log(uploadCart);

  return (
    <div>
      <Navbar2 />

      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <img src={productState?.images} alt="" />
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
                      {productState?.description}
                    </p>
                  </div>
                  {alreadyAdded === false && (
                    <>
                      <div className="d-flex flex-column gap-2 pb-4">
                        <h3 className="product-heading">Grade</h3>
                        <div className="d-flex flex-wrap gap-15 grade">
                          {/* First span */}
                          <div
                            className="badge border border-1 p-3 button-select"
                            style={{ backgroundColor: "black", color: "white" }}
                          >
                            <Grades
                              setGrade={setGrade}
                              gradeData={
                                productState &&
                                productState.grade.slice(
                                  0,
                                  Math.ceil(productState.grade.length / 3)
                                )
                              } // Pass the first third of the gradeData array
                            />
                          </div>

                          {/* Second span */}
                          <div
                            className="badge border border-1 p-3 button-select"
                          >
                            <Grades
                              setGrade={setGrade}
                              gradeData={
                                productState &&
                                productState.grade.slice(
                                  Math.ceil(productState.grade.length / 3),
                                  Math.ceil((productState.grade.length * 2) / 3)
                                )
                              } // Pass the second third of the gradeData array
                            />
                          </div>

                          {/* Third span */}
                          <div
                            className="badge border border-1 p-3 button-select"
                          >
                            <Grades
                              setGrade={setGrade}
                              gradeData={
                                productState &&
                                productState.grade.slice(
                                  Math.ceil((productState.grade.length * 2) / 3)
                                )
                              } // Pass the last third of the gradeData array
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className=" d-flex align-items-center gap-3 pb-4">
                    {alreadyAdded === false && (
                      <>
                        <h3 className='product-heading'>Quantity(Kg): </h3>
                        <div className="">
                          <input
                            type="number"
                            name=""
                            min={1}
                            max={100}
                            className="form-control"
                            style={{ width: "70px", height: "40px" }}
                            id=""
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                            placeholder="Enter quantity" // Add placeholder attribute here
                          />
                        </div>
                      </>
                    )}
                    <div
                      className={
                        alreadyAdded
                          ? "ms-0"
                          : "ms-5" + "d-flex align-items-center gap-2"
                      }
                    >
                      <button
                        className="product-button me-4"
                        type="submit"
                        onClick={() => {
                          alreadyAdded ? navigate("../cart") : uploadCart();
                        }}
                      >
                        {alreadyAdded ? "Go To Cart" : "Add to Cart"}
                      </button>
                      <button
                        className="product-button buy"
                        type="submit"
                        style={{ backgroundColor: "#000000" }}
                      >
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
