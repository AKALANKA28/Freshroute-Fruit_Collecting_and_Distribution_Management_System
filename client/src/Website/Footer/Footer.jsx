import React from 'react'
import './footer.css'

import logo from '../assets/footer_logo_green.svg'
const Footer = () => {
  return (
    <>
    <footer className='site-footer'>
    <div className="container flex__center">
        <div className="row flex__center">
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="footer-widget">
                    <a href="index.html" className="footer-widget__logo">
                        <img src={logo} alt=""/>
                    </a>
                    <p>There are many variations of passages of lorem ipsum available, but the majority suffered.</p>
                        <div className="footer_social">
                            <a href="#" className="fab fa-facebook-square"></a>
                            <a href="#" className="fab fa-twitter"></a>
                            <a href="#" className="fab fa-pinterest-p"></a>
                            <a href="#" className="fab fa-instagram"></a>
                        </div>
                    </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-2 col-links">
                <div className="footer-widget footer-widget__links-widget ">
                    <h3 className="footer-widget__title">Quick Links</h3>
                    <ul className="list-unstyled footer-widget__links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Shop</a></li>
                        <li><a href="#"></a></li>
                    </ul>
                </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-2 col-links">
                <div className="footer-widget footer-widget__links-widget">
                    <h3 className="footer-widget__title">Community</h3>
                    <ul className="list-unstyled footer-widget__links">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Partners</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Upcoming Events</a></li>
                        <li><a href="#">News</a></li>
                    </ul>
                </div>
            </div>
                
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 col-links">
                    <h3 className="footer-widget__title title_contact">Contact</h3>
                    <ul className="list-unstyled footer-widget__contact">
                        <li>
                            <i className="bi bi-telephone-inbound-fill"></i>
                            <a href="tel:011 2 751 757">011 2 751 757 / 076 156 7757</a>
                        </li>
                        <li>
                            <i className="bi bi-envelope-fill"></i>
                            <a href="mailto:info@freshroute.lk">info@freshroute.lk</a>
                        </li>
                        <li>
                            <i className="bi bi-geo-alt-fill"></i>
                            <a href="#">718/5, Keremulla Road, Panagoda,
                                Homagama</a>
                        </li>
                    </ul>
            </div>
         </div>
    

    </div>
   </footer>
   <div className="bottom-footer flex_center">
            <div className="container mb-0 flex_center">
                <p>© 2024 Freshroute.lk copyright all right reserved.</p>
                {/* <div className="bottom-footer__links">
                    <a href="#">Terms &amp; Conditions</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Sitemap</a>
                </div> */}
            </div>
        </div>
    </>
   

  )
}

export default Footer
