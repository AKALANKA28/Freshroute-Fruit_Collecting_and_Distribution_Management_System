import React from 'react'
import './website.css'
import Card from './Shop/Products/Card'
import Footer from './Footer/Footer'
import { Link } from 'react-router-dom'
import Container from './Container'

const Shop = () => {
  return (
   <>
    <div className="product-header">
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
      </div>

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
            <div className="filter-card mb-3">
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
                      <label className="form-check-label" for=""> Out of Stock (0) </label>
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
                        <label for="formId1">From</label>
                      </div>  

                      <div className="form-floating ">
                        <input
                          type="text"
                          className="form-control "

                          name="formId1"
                          id="formId1"
                          placeholder="To"
                        />
                        <label for="formId1">To</label>
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
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts">21 Fruits</p>
                    <div className="d-flex align-items-center gap-10">
                      <img src="" alt="grid" className="d-block img-fluid" />
                      <img src="" alt="grid" className="d-block img-fluid" />
                      <img src="" alt="grid" className="d-block img-fluid" />
                      <img src="" alt="grid" className="d-block img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list d-flex gap-2 pb-5">
                <Card />
                <Card />
                <Card />
                <Card />

              </div>

          </div>
        </div>             
    </Container>
    <Footer />
   </>
  )
}

export default Shop



// import React, {useState} from 'react'
// import Navbar from './Navbar/Navbar'
// import Footer from './Footer/Footer'


// import Navigation from "./Shop/Sidebar/Search/Search";
// import Products from "./Shop/Products/Products";
// import products from "./Shop/db/data";
// import Recommended from "./Shop/Recommended/Recommended";
// import Sidebar from "./Shop/Sidebar/Sidebar";
// import Card from "./Shop/Components/Card";

// const Shop = () => {

//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // ----------- Input Filter -----------
//   const [query, setQuery] = useState("");

//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const filteredItems = products.filter(
//     (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
//   );

//   // ----------- Radio Filtering -----------
//   const handleChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   // ------------ Button Filtering -----------
//   const handleClick = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   function filteredData(products, selected, query) {
//     let filteredProducts = products;

//     // Filtering Input Items
//     if (query) {
//       filteredProducts = filteredItems;
//     }

//     // Applying selected filter
//     if (selected) {
//       filteredProducts = filteredProducts.filter(
//         ({ category, color, company, newPrice, title }) =>
//           category === selected ||
//           color === selected ||
//           company === selected ||
//           newPrice === selected ||
//           title === selected
//       );
//     }


//     return filteredProducts.map(
//       ({ img, title, star, reviews, prevPrice, newPrice }) => (
//         <Card
//           key={Math.random()}
//           img={img}
//           title={title}
//           star={star}
//           reviews={reviews}
//           prevPrice={prevPrice}
//           newPrice={newPrice}
//         />
//       )
//     );
//   }

//   const result = filteredData(products, selectedCategory, query);

//   return (
//     <div>
//       <Navbar/>
//       <Sidebar handleChange={handleChange} />
//       <Navigation query={query} handleInputChange={handleInputChange} />
//       <Recommended handleClick={handleClick} />
//       <Products result={result} />
//       <Footer/>
//     </div>
//   )
// }

// export default Shop
