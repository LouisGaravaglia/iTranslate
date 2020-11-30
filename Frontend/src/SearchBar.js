import React, {useState} from 'react';

const SearchBar = ( { header, handleSubmit, loadingIcon, typeOfSearch} ) => {
  const [searchVal, setSearchVal] = useState("")

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const triggerSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchVal);
  };

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

let headerClassName;

if (typeOfSearch === "search-landing") headerClassName = "Search-Landing";
if (typeOfSearch === "search-language") headerClassName = "Search-Language";
if (typeOfSearch === "artists-language") headerClassName = "Artist-Language";
if (typeOfSearch === "genre-language") headerClassName = "Genre-Language";
if (typeOfSearch === "danceability-language") headerClassName = "Danceability-Language";

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className="Search-Field">
      {loadingIcon}
      <div className="Search-Field-Content">
      <h1 className={headerClassName}>{header}</h1>
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