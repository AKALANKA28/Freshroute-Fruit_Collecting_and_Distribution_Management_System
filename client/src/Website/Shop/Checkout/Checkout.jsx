import React from 'react'
import { Link } from 'react-router-dom'
import img from "../../assets/image1.jpg"
import './checkout.css'
import Footer from '../../Footer/Footer'
import Container from '../../Container'
const Checkout = () => {
  return (
    <div> 
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
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-7">
                    <div className="chekout-left-data">
                        <h3 className='website-name'>FreshRoute</h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to='/cart' className='text-dark text-decoration-none total-price'>Cart</Link>    
                                </li>
                            
                                <li className="breadcrumb-item total-price">                               
                                        Information                                
                                </li><li className="breadcrumb-item total-price">                               
                                        Shipping                                
                                </li><li className="breadcrumb-item total-price">                              
                                        Payment                           
                                </li>                           
                            </ol>
                        </nav>
                        <h4 className="title mt-5">
                            Contact Information
                        </h4>
                        <p className="user-details">
                            Nethmina Akalanka (nethminaakalanka@gmail.com)
                        </p>
                        <h4 className=" mt-4 mb-3 title">Shipping Address</h4>
                        <form 
                            action="" 
                            className="d-flex gap-15 flex-wrap justify-content-between"
                        >

                         <div className='w-100'>
                            <select
                             name=""
                             id=""
                             className="form-control form-select"
                            >
                                <option value='' selected disabled>
                                    Select Country
                                </option>
                            </select>
                        </div> 
                        <div className='flex-grow-1'>
                            <input type="text" placeholder='First Name'className="form-control" />
                        </div>
                        <div className='flex-grow-1'>
                            <input type="text" placeholder='Last Name'className="form-control" />
                        </div>
                        <div className='w-100'>
                            <input type="text" placeholder='Address' className="form-control" />
                        </div>
                        <div className='w-100'>
                            <input type="text" placeholder='Warehouse, Store, etc' className="form-control" />
                        </div>
                        <div className='flex-grow-1'>                            
                            <input type="text" placeholder='Zipcode' className="form-control" />
                        </div>  
                        <div className='flex-grow-1'> 
                            <select
                             name=""
                             id=""
                             className="form-control form-select"
                            >
                                <option value='' selected disabled>
                                    Select State
                                </option>
                            </select>
                        </div >  
                        <div className='flex-grow-1'>
                           <input type="text" className="form-control" />
                        </div>
                        <div className="w-100 mt-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <Link to='/cart' className='text-dark text-decoration-none'><i class="bi bi-chevron-left me-2"></i>Back to cart</Link>
                                <Link to='/payment' className='product-button'>Continue to Payment</Link>

                            </div>    
                        </div>  
                        </form>
                    </div>     
                </div>
                <div className="col-5">
                <div className="chekout-right-data">
                    <div className='border-bottom py-4'>
                        <div className="d-flex gap-5 align-items-center">
                            <div className="w-75 d-flex gap-3">
                                <div className='w-25 position-relative'>
                                    <span style={{top: "-15px", left:"75px", padding: "10px 15px"}}className='badge bg-secondary text-white rounded-circle  position-absolute'>2</span>
                                    <img src={img} alt='img' className='img-fluid'/>
                                </div>
                                <div>
                                    <div className="title">Alphonso</div>
                                    <p className='total-price'>A / 2kg</p>
                                </div>
                            </div> 
                            <div className='flex-grow-1'>
                                    <p className='total'>Rs 1000</p>
                            </div>                     
                        </div>
                        </div>
                        <div className='border-bottom py-4'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='total'>Subtotal:</p>
                            <p className='total-price'>1000</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0 total'>Tax</p>
                            <p className='mb-0 total-price'>2%</p>
                        </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                            <h4 className='total'>Total</h4>
                            <h4 className='total-price'><span>Rs</span>1000</h4>
                        </div>
                    </div>
                </div>

            </div>
      </Container>
      <Footer/>
    </div>
  )
}

export default Checkout
