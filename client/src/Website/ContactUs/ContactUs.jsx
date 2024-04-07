import React from 'react'

const ContactUs = () => {
  return (
    <div>
       <section class="section section--dark-bg  section--contacts">
            <div class="container">
                <div class="row justify-content-end">
                    <div class="col-12 col-md-6">

                        <div class="row justify-content-end">
                            <div class="col-md-11">
                                <div class="section-heading section-heading--white">
                                    <h2 class="__title">Get <span>in touch</span></h2>

                                    <p>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
                                </div>

                                <form class="contact-form js-contact-form" action="#">
                                    <div class="input-wrp">
                                        <input class="textfield" name="name" type="text" placeholder="Name" />
                                    </div>

                                    <div class="input-wrp">
                                        <input class="textfield" name="email" type="text" placeholder="E-mail" />
                                    </div>

                                    <div class="input-wrp">
                                        <textarea class="textfield" name="message" placeholder="Comments"></textarea>
                                    </div>

                                    <button class="custom-btn custom-btn--medium custom-btn--style-3 wide" type="submit" >Send</button>

                                    <div class="form__note"></div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row no-gutters">
                <div class="col-md-6  map-container map-container--left">
                </div>
            </div>
		</section>
    </div>
  )
}

export default ContactUs
