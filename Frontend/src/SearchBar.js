import React, {useState} from 'react';

const SearchBar = ( { header, handleSubmit, loadingIcon} ) => {
  const [searchVal, setSearchVal] = useState("")

  const triggerSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchVal);
  };

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <div className="Search-Field">
      {loadingIcon}
      <div className="Search-Field-Content">
      <h1>{header}</h1>
      <form className="Search-Input-Container">
      <div >
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
      </div>
      <div className="Search-Field-Filler"></div>
    </div>
  );
};

export default SearchBar;