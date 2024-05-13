import React from 'react'


function PageTitle  ({page})  {
  return (
    <div className='pagetitle'>
        <h1>Research Analysis</h1>
        <nav>
            <ol className="breadcumb">
                <li className="breadcumb-item">
                    <a href='#'>
                        <i className="bi bi-house-door"></i>
                    </a>
                </li>
                <li className='breadcumb-item active'>{page}</li>
            </ol>
        </nav>
    </div>
  )
}

export default PageTitle
