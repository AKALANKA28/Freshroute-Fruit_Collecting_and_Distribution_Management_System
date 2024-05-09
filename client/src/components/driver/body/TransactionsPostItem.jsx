import React from 'react'

const NewsPostItem = ({ item}) => {
  return (
    <div className='post-item clearfix'>
      <img src={item.date} alt='' />
      <h4>
        <a href='#'>{item.title}</a>
      </h4>
      <p>{item.subtitle}...</p>
    </div>
  )
}

export default NewsPostItem
