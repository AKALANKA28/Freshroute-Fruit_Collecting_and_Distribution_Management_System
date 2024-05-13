import React from 'react'


function PageTitle  ({page})  {
  return (
    <div className='pagetitle'>
        <h1>{page}</h1>
        <nav>
            <ol className="breadcumb">
                <li className="breadcumb-item">
                    <a href='/'>
                    </a>
                </li>
            </ol>
        </nav>
    </div>
  )
}

export default PageTitle
