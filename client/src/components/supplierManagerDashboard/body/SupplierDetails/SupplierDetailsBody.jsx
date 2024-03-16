import React from 'react'
import '../main.css'
import SuppliersList from './SuppliersList'
const SupplierDetailsBody = () => {

  return (
    <div id="main"> 
      <section className="body" id='body'>
        <div className="row">
            <div className="col-lg-8">
                <div className="row">
                  <button className="btn btn-primary"><a href='AddSupplier'>Add Supplier</a></button>
                    <SuppliersList />
                </div>    
            </div>  
        </div>  
      </section>  
   </div>
  )
}

export default SupplierDetailsBody