import React, {useState} from 'react';
import Hover from "./Hover";

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

////////////////////////////////////////////////////  CLASSNAME VARIABLES  ////////////////////////////////////////////////////

let headerClassName;
let inputColorClassName;
let buttonColorClassName;

if (typeOfSearch === "search-landing") {
  headerClassName = "Search-Landing";
  inputColorClassName = "Search-Landing-Text";
  buttonColorClassName = "fa fa-search icon Search-Landing-Button";
};

if (typeOfSearch === "search-language") {
  headerClassName = "Search-Language";
  inputColorClassName = "Search-Language-Text";
  buttonColorClassName = "fa fa-search icon Search-Language-Button";
};

if (typeOfSearch === "artists-language") {
  headerClassName = "Artist-Language";
  inputColorClassName = "Artist-Language-Text";
  buttonColorClassName = "fa fa-search icon Artist-Language-Button";
};

if (typeOfSearch === "genre-language") {
  headerClassName = "Genre-Language";
  inputColorClassName = "Genre-Language-Text";
  buttonColorClassName = "fa fa-search icon Genre-Language-Button";
};

if (typeOfSearch === "danceability-language") {
  headerClassName = "Danceability-Language";
  inputColorClassName = "Danceability-Language-Text";
  buttonColorClassName = "fa fa-search icon Danceability-Language-Button";
};

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
          className={inputColorClassName}
          value={searchVal}
          onChange={handleChange}
        />
        <button onClick={triggerSubmit} type="submit">
          <Hover scale={1.15}>
            <i className={buttonColorClassName}></i>
          </Hover>
        </button>
      </div>
      </form>
      </div>
      <div className="Search-Field-Filler"></div>
    </div>
  );
};

export default SearchBar;