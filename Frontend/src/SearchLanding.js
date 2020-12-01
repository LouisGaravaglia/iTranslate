import React from 'react';
import {Spring} from 'react-spring/renderprops';
import SearchBar from "./SearchBar";

const SearchLanding = ({handleTrackSearchSubmit}) => {

  return (
    <Spring
      from={{opacity: 0}}
      to={{opacity: 1}}
      config={{delay: 300, duration: 300}}
    >
      {props => (
        <div style={props}>

          <SearchBar header="Find your song!" handleSubmit={handleTrackSearchSubmit} typeOfSearch="search-landing"/>

        </div>
      )}
    </Spring>
  );
};

export default SearchLanding;