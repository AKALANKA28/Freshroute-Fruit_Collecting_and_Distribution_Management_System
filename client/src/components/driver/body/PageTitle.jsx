import React from 'react'
import SearchBar from '../Components/SearchBar'


function PageTitle  ({page})  {
  return (
    <>
   
    <div className="container-xxl">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className='header-pagetitle col-6 flex-s'>
          <h1>Good Morning, Sunil</h1>
          <p>Today is Wednesday, 08 May 2024</p>
        </div>
        <div className="col-6 d-flex align-items: center justify-content-end">
          <SearchBar/>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default PageTitle
