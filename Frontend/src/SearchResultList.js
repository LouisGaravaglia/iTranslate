import React, {useState, useEffect} from 'react';
import Slider from '@material-ui/core/Slider';
import SearchResult from "./SearchResult";

const SearchResultList = ({resultsArray, handleSearch, itemsPerPage, typeOfResults}) => {
  const [sliderVal, setSliderVal] = useState(0);
  const multipleOf = resultsArray.length % itemsPerPage === 0;
  let maxSliderVal = Math.floor(resultsArray.length / itemsPerPage);
  const resultsInView = resultsArray.slice(sliderVal * itemsPerPage, (sliderVal * itemsPerPage) + itemsPerPage);
  console.log("SearchResultList re-rendering");
  if (!multipleOf) maxSliderVal += 1;

  const handleChange = (event, newValue) => {
    setSliderVal(newValue);

    console.log("Slider Value: ", sliderVal);
  };

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  let displaySearchResults;

  if (typeOfResults === "search-results") displaySearchResults = (
    resultsInView.map((r, i) => <SearchResult key={i} index={i} handleClick={handleSearch} artist={r.artists[0].name} album={r.album.name} track={r.name}/>)
  );

  let displayArtists;

  if (typeOfResults === "artists") displayArtists = (
            // artists.map(artist => <button onClick={() => handleArtistClick(artist.spotify_id, artist.name)}>{artist.name}</button>)

    resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="artists" handleClick={handleSearch} artist={r.name} spotify_id={r.spotify_id}/>)
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      {displaySearchResults}
      {displayArtists}
      {/* {resultsInView.map((r, i) => <SearchResult key={i} index={i} handleClick={handleSearch} artist={r.artists[0].name} album={r.album.name} track={r.name}/>)} */}
      {resultsArray.length > itemsPerPage && <Slider className="Search-Slider" color="" value={sliderVal} max={maxSliderVal - 1} min={0} step={1} onChange={handleChange} aria-labelledby="continuous-slider" />}
    </>
  );
};

export default SearchResultList;