import React, { useState } from 'react';

const SearchBar = ({ onSearch, searchAttribute, onSearchAttributeChange }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div>
      <div className='search-bar'>
        <form className='search-form d-flex align-items-center pe-5' onSubmit={handleSubmit}>
          <input type='text' name='query' value={query} onChange={handleChange} placeholder="Search" title='Enter search keyword'/>
          <button type='submit' title='Search'>
            <i className='bi bi-search'></i>
          </button>

          {/* Dropdown list for selecting search attribute */}
          <div className="dropdown" style={{ marginLeft: "20px" }}>
            <select value={searchAttribute} onChange={onSearchAttributeChange} className="form-select" style={{ fontSize: "12px", width: "200px" }}>
              <option value="fruit">Search by Fruit</option>
              <option value="quality">Search by Quality</option>
            </select>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default SearchBar;