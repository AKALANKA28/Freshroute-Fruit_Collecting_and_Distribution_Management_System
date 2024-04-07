import React from 'react'

const Search = ({ handleInputChange, query }) => {
  return (
       <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search shoes."
        />
      </div>
  )
}

export default Search
