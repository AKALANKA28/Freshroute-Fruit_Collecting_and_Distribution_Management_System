import React, {useEffect, useState} from 'react'
import './main.css'

const SearchBar = ({enableFilterType, filterColumns, handleSearch, clearInputField}) => {

    const [inputValue, setInputValue] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterDataType, setFilterDataType] = useState("text")
    useEffect(()=>{
        setFilterType(filterColumns[0].tag);
        setFilterDataType(filterColumns[0].type? filterColumns[0].type: 'text');
        setInputValue("")
    },[])

    useEffect(() => {
        setInputValue("");
        setFilterType(filterColumns[0].tag)
        setFilterDataType(filterColumns[0].type? filterColumns[0].type: 'text')
    }, [clearInputField]);
    const handleOnSubmit = (event) => {
        event.preventDefault();
        const filterDataObj = {
            filterType:filterType,
            filterValue:inputValue
        }
        handleSearch(filterDataObj)
    };
    const handleInputChange = (event) => {
        const {value} = event.target;
        setInputValue(value);
    }
    const handleFilterTypeChange = (event) => {
        const{ value } = event.target;
        setFilterType(value);
        setInputValue("");
        filterColumns.map((filter) => {
            if (filter.tag === value) {
                setFilterDataType(filter.type? filter.type : 'text');
            }
        })
    }
  return (
    <div>
        <div className='search-bar search-bar-width'>
            <form className='search-form w-100 d-flex flex-row justify-content-end pb-1' onSubmit={handleOnSubmit}>
                <div className="m-0 w-25"></div>
                {enableFilterType && filterColumns &&
                    <select className="w-25 m-0 form-select rounded-4 text-secondary" name="filterType" id="dropdown"
                            style={{maxWidth: '200px'}} onChange={handleFilterTypeChange}
                            value={filterType}>
                        {filterColumns.map((value, index) => (
                            <option key={index} value={value.tag}>{value.name}</option>
                        ))}
                    </select>
                }

                <div className="m-0 w-50" style={{maxWidth: '300px'}}>
                    <input type={filterDataType} name='filterValue' placeholder='Search' title='Enter search keyword'
                           onChange={handleInputChange} value={inputValue}/>
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
