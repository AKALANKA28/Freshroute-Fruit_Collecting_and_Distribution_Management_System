import React from 'react'


function PageTitle  ({page})  {
  return (
    <div className='pagetitle'>
        <h1>{page}</h1>
        <nav>
            <ol className="breadcumb">
            </ol>
        </nav>
    </div>
  )
}

export default PageTitle
