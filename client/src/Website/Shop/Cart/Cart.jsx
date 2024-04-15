import React from 'react'
import './cart.css'
import img from "../../assets/image1.jpg"
import { Link } from 'react-router-dom'
import Container from '../../Container'


const Cart = () => {

  return (
    <>
    <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
           <div className="col-12">
            <div className="cart-header d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Fruit</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center border-bottom">
              <div className="cart-col-1 d-flex align-items-center gap-5">
                <div className='w-25'>
                  <img src={img} alt='' className='img-fluid'/>
                </div>
                <div className='w-75'>
                  <p>hjkjkhjk</p>
                  <p>Grade: </p>
              </div>
            </div>
            <div className="cart-col-2">
                <h5 className="price">Rs.1000</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-3">
                <input
                  type="" 
                  className="form-control"
                  name=''
                  min={1}
                  max={10}
                  id=''  
                />
                <div>
                 <i className="bi bi-trash3 text-danger"></i>
                </div>

              </div>
              <div className="cart-col-4">
                <h5 className="price">Rs.1000</h5>
              </div>
           </div>

           <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
             <Link to='/store' className='product-button'>Continue Shopping</Link>
             <div className='d-flex flex-column align-items-end'>
              <h4>SubTotal: Rs.1000.00</h4>
              <p>Taxes and shipping calculate at checkout</p>
              <Link to='/checkout' className='product-button'>Checkout</Link>
             </div>
            </div>
           </div>
        </div>
       </div>
    </Container>
    </>
  )
}

export default Cart
