import React from 'react'
import { Link } from 'react-router-dom'
import "./products.css"

import img1 from "../../assets/image1.jpg"


const Card = () => {
  return (
    
    <div className='col-3'>
      <div className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <Link>
            <i class="bi bi-heart"></i>
          </Link>
        </div>
        <Link to=":id">
          <div className="product-img">
            <img 
              src={img1} 
              alt="" 
              className="img-fluid" 
            />
            <img 
              src="" 
              alt="" 
              className="img-fluid" 
            />
          </div>
        </Link>
        
        <div className="product-details">
          <h6 className="category">Mango</h6>
          <h5 className="product-title">Alphonso</h5>
          <p className="stock">Available Stock <span>10000</span></p>
          <p className="price">Rs.10000.00 <span>/per kilo</span></p>
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
}

export default Card
