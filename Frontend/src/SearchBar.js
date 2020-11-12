import React, {useState} from 'react';

const SearchBar = ( { header, handleSubmit} ) => {
  const [searchVal, setSearchVal] = useState("")

  const triggerSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchVal);
  }

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  }

  return (

      <div className="Search-Field">
        <p></p>
        <h1>{header}</h1>
        <form>
        <div className="Search-Input-Container">
          <input
            type="text"
            id="SearchVal"
            name="searchVal"
            value={searchVal}
            onChange={handleChange}
          />
          <button onClick={triggerSubmit} type="submit"><i class="fa fa-search icon"></i></button>
        </div>
        </form>
        <p></p>
      </div>

  );

};

export default SearchBar;