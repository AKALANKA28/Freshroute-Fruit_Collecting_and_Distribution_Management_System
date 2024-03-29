import React from 'react'
import logo from '../../../assests/leaf.png'


function Logo(){
    const handleToggleSideBar = () => {
      document.body.classList.toggle('toggle-sidebar');
    }
  
    return (
        <div className='d-flex align-items-center justify-content-between'>
        <a href='/' className='logo d-flex align-items-center'>
         <img src={logo} alt='logo'/>
           <span className='d-none d-lg-block'>Leaf.</span>
        </a>
       <i className='bi bi-list toggle-sidebar-btn' onClick={handleToggleSideBar}></i>
       </div>
    )
    
}
export default Logo
