import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./products.css"

import img1 from "../../assets/image1.jpg"


const Card = ({data}) => {

  const navigate = useNavigate();

  let location = useLocation();

  if (!Array.isArray(data)) {
    return null;
  }
  return (
    

    <>
    {data?.map((item, index) =>{

      
        return(
          <div className='col-3' style={{width: "23.7%"}}>
          <div className="product-card position-relative">
            <div className="wishlist-icon position-absolute">
              <Link to={"/shop/"+item?._id}>
                <i class="bi bi-heart"></i>
              </Link>
            </div>
            <div>
              <div className="product-img">
                <img 
                  src={img1} 
                  alt="" 
                  className="img-fluid d-block" 
                  onClick={() => navigate("/shop/"+item?._id)}
                />
                {/* <img 
                  src="" 
                  alt="" 
                  className="img-fluid" 
                /> */}
              </div>
            </div>
            
            <div className="product-details">
              <h5 className="product-title mt-3">{item?.title}</h5>
              <h6 className="category">{item?.title}</h6>
              <p className="stock">Available Stock<span> 10000</span></p>
              <p className="price">Rs {item?.price}<span> / per kilo</span></p>
              <div className="d-flex align-items-center gap-2 mb-2">
                <button className="p-button" type='submit'>Add to Cart</button>
                <button className="p-button buy" type='submit'>Buy Now</button>
              </div>
            </div>
    
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column">
                <Link>
                <i class="bi bi-share"></i>
                </Link>
                <Link>
                <img src="" alt='' />
    
                  <i class="bi bi-share"></i>
                </Link>
                <Link>
    
                <img src="" alt='' />
    
                  <i class="bi bi-eye"></i> 
                </Link>
              </div>
            </div>
          </div>
        </div>
        )
      })
    }

    </>
   
  );
};

export default Card
