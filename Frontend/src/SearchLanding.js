import React from 'react';
import {Spring} from 'react-spring/renderprops';
import SearchBar from "./SearchBar";

const SearchLanding = ({handleTrackSearchSubmit}) => {

  return (
    <Spring
      from={{opacity: 1, marginLeft: -2500}}
      to={{opacity: 1, marginLeft: 0}}
      reverse={false}
      config={{delay: 0, duration: 200}}
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