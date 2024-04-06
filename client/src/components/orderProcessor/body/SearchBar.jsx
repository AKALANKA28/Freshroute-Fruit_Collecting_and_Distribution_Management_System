import React from 'react'
import './main.css'

const SearchBar = ({enableFilterType, filterColumns, handleSearch}) => {

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const filterData = new FormData(event.target);
        const filterDataObj = Object.fromEntries(filterData.entries());
        handleSearch(filterDataObj)
    };
    return (
        <div>
            <div className='search-bar search-bar-width'>
                <form className='search-form w-100 d-flex flex-row align-items-end pb-1' onSubmit={handleOnSubmit}>
                    <div className="m-0 w-25"></div>
                    {enableFilterType && filterColumns &&
                        <select className="w-25 m-0 form-select rounded-4 text-secondary" name="filterType" id="dropdown">
                            {filterColumns.map((value, index) => (
                                <option key={index} value={value.tag}>{value.name}</option>
                            ))}
                        </select>
                    }

                    <div className="m-0 w-50">
                        <input type='text' name='filterValue' placeholder='Search' title='Enter search keyword'/>
                        <button type='submit' title='Search'>
                            <i className='bi bi-search'>
                            </i>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SearchBar
