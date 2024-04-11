import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

import "./website.css"
import Container from './Container'



const Contact = () => {




  return (
    <div>
        <Navbar/>
        <Container class1="contact-wrapper py-5 home-wrapper-2">
            <div className="row"> 
              <div className="col-12 mt-5 ">
                <div className="contact-inner-wrapper d-flex justify-content-between">
                  <div>
                    <h3 className="contact-title mb-5 mt-5">Get in touch with us</h3>
                    <form action="" method="post" className='d-flex flex-column m-3 gap-15'>
                      <div>
                        <input type="text" className="form-control" placeholder='Name'/>
                      </div>
                      <div>
                        <input type="text" className="form-control" placeholder='Email'/>
                      </div>
                      <div>
                        <input type="text" className="form-control" placeholder='Mobile'/>
                      </div>
                      <div>
                        <textarea
                          name=''
                          id=''
                          className='w-100 form-control'
                          cols='30'
                          rows='5'
                          placeholder='Message'
                        />
                      </div>
                      <div>
                        <button className="button mb-2">Submit</button>
                      </div>
                    </form>
                  </div>
                  <div>
                    
                
           
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d990.3161028665752!2d80.02407676963402!3d6.858879999571241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTEnMzIuMCJOIDgwwrAwMScyOS4wIkU!5e0!3m2!1sen!2slk!4v1712777684232!5m2!1sen!2slk" 
                      width="600"
                      height="450"
                      className='border-0 w-100 h-100'
                      allowFullScreen="" 
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade">
                    </iframe>

                    
                    {/* <div className='d-flex flex-row align-items-center justify-content-between mt-4 lower-contact '>
                        <div className="col-sm-4">
                          <h6><i className="bi bi-geo-alt-fill me-3"></i>Address:</h6>
                          <p>718/5, Keremulla Road, Panagoda, Homagama</p>
                        </div>
                        <div className="col-sm-3">
                        <h6><i className="bi bi-envelope-fill me-3"></i>Email:</h6>
                        <p>info@freshroute.lk</p>
                        </div>
                        <div className="col-sm-3">
                        <h6><i className="bi bi-telephone-inbound-fill me-3"></i>Telephone:</h6>
                        <p>011 2 751 757</p>


                        </div>
                        
                    </div> */}
                  </div>
                  
                </div>
              </div>
            </div>        
        </Container>

       
        <Footer />

      
    </div>
  )
}

export default Contact
