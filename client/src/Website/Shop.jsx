import React, { useEffect } from 'react'
import './website.css'
import Card from './Shop/Products/Card'
import Footer from './Footer/Footer'
import { Link } from 'react-router-dom'
import Container from './Components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/products/productSlice';
import Navbar2 from './Navbar/Navbar2'



const Shop = () => {


  const productState = useSelector((state) => state?.product?.product);
  const dispatch =useDispatch();
  useEffect (() => {
    getProducts();
  }, []);

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  return (
   <>
 

      <Navbar2 />

    <Container class1='shop-wrapper home-wrapper-2 py-5'>
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
                <h3 className='filter-title'>Shop By Categories</h3>
                <ul className='ps-0'>
                  <li>Mango</li>
                  <li>Banana</li>
                  <li>Pineapple</li>
                  <li>Grapes</li>
                </ul>
            </div>
            <div className="filter-card mb-3" style={{paddingBottom:"16.3rem"}}>
                <h3 className='filter-title'>Filter By</h3>

                <h5 className="sub-title">Avalability</h5>
                <div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="" />
                      <label className="form-check-label" htmlFor=""> In Stock (1) </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor=""> Out of Stock (0) </label>
                    </div>
                </div>

                <h5 className="sub-title">Grade</h5>
                 <div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="" />
                      <label className="form-check-label" htmlFor=""> A (6) </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="" />
                      <label className="form-check-label" htmlFor=""> B (5) </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor=""> C (2) </label>

                  
                    </div>
                </div>

                <h5 className="sub-title">Price</h5>
                <div>
                    <div className="d-flex align-items-center gap-2">
                    <div className="form-floating ">
                        <input
                          type="text"
                          className="form-control"
                          name="formId1"
                          id="formId1"
                          placeholder="From"
                        />
                        <label htmlFor="formId1">From</label>
                      </div>  

                      <div className="form-floating ">
                        <input
                          type="text"
                          className="form-control "
                          name="formId1"
                          id="formId1"
                          placeholder="To"
                        />
                        <label htmlFor="formId1">To</label>
                      </div>  
                    </div>     
                </div>  
            </div>  
          </div>

          <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{width: "100px"}}>Sort By</p>

                  <select 
                     name="" 
                     id="" 
                     className="form-control form-select">

                    <option value="manual">Featured</option>
                    <option value="best-selling">Featured</option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">Alphabetically, Z-A</option>
                    <option value="price-ascending">Price, high to low</option>
                    <option value="price-descending">Price, low to high</option>
                  </select>
                </div>
                {/* <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts">21 Fruits</p>
                    <div className="d-flex align-items-center gap-10">
                      <img src="" alt="grid" className="d-block img-fluid" />
                      <img src="" alt="grid" className="d-block img-fluid" />
                      <img src="" alt="grid" className="d-block img-fluid" />
                      <img src="" alt="grid" className="d-block img-fluid" />
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="products-list d-flex gap- pb-5">
                <div className="d-flex gap-3 flex-wrap">
                  <Card data={productState ? productState: []}/>
                    {/* Render pagination component */}
          <div className="pagination align-items-center  justify-content-end">
              <button disabled
                // onClick={handlePreviousPage}
                // disabled={currentPage === 1}
                className="me-4"
                style={{ backgroundColor: "#ffffff", border: "none", padding:"0px 10px" }}

              >
                <i class="bi bi-chevron-left"></i>{" "}
              </button>
              <span className="text-dark" style={{fontSize:"18px", fontWeight:"500"}}>
                <span className="me-4">1</span><span>2</span>
              </span>
              <button
                // onClick={handleNextPage}
                // disabled={currentPage === totalPages}
                className="ms-4"
                style={{ backgroundColor: "#ffffff", border: "none", padding:"0px 10px" }}

              >
                <i class="bi bi-chevron-right"></i>{" "}
              </button>
            </div>
                </div>

                
              </div>

          </div>
        
        </div>             
    </Container>
    <Footer />
   </>
  )
}

export default Shop


