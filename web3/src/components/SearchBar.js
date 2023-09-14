import React from 'react'
import { Row, Col } from 'react-bootstrap'
const SearchBar = ({ onSearch }) => {
  return (
    <form className="form-inline my-2 my-lg-0">
      <div className='searchBarRow'>
  
        <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => onSearch(e.target.value)}
    />
    

    
        
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
    </button>
       </div>
</form>
  )
}

export default SearchBar
