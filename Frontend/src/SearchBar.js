import React, {useState} from 'react';
import {Spring} from 'react-spring/renderprops';

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

    //     <Spring
    //   from={{opacity: 0}}
    //   to={{opacity: 1}}
    //   config={{delay: 300, duration: 300}}
    // >
    //   {props => (
    //     <div style={props}>

      <div className="Search-Field">
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

    //     </div>
    //   )}
    // </Spring>

  );

};

export default SearchBar;