// ./client\src\components\researchDashboard\body\Revenue\RTitle.jsx
import React from 'react'


function PTitle  ({page})  {
  return (
    <div className='pagetitle'>
        <h1>{page}</h1>
        <nav>
            <ol className="breadcumb">
                <li className="breadcumb-item">
                    <a href='/'>
                        <i className="bi bi-house-door"></i>
                    </a>
                </li>
                <li className='breadcumb-item active'>{page}</li>
            </ol>
        </nav>
    </div>
  )
}

export default PTitle
