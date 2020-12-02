import React, {useState} from 'react';
import SearchResult from "./SearchResult";
import PaginationSlider from "./PaginationSlider";

const SearchResultList = ({resultsArray, handleSearch, itemsPerPage, typeOfResults, loadingIcon, typeOfTracks, typeOfArtists, typeOfAlbums}) => {
  const [sliderVal, setSliderVal] = useState(0);
  const resultsInView = resultsArray.slice(sliderVal * itemsPerPage, (sliderVal * itemsPerPage) + itemsPerPage);
  const needsPaginationSlider = resultsArray.length > itemsPerPage;
  
  const updateResultsInView = (val) => {
    setSliderVal(val);
  };

////////////////////////////////////////////////////  SEARCH RESULTS  ////////////////////////////////////////////////////

  let displaySearchResults;

  if (typeOfResults === "search-results") displaySearchResults = (
    <>
      <div className="Result-Box">
        {loadingIcon}
        {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="search-results" handleClick={handleSearch} artist={r.artists[0].name} album={r.album.name} track={r.name} musicObject={r}/>)}
      </div> 
      {needsPaginationSlider && <PaginationSlider resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Main-Pagination-Slider-Container" sliderClass="Main-Pagination-Slider"/>}
      {!needsPaginationSlider && <div className="Main-Pagination-Slider-Placeholder"></div>}
    </>
  );

////////////////////////////////////////////////////  DISPLAY ARTISTS  ////////////////////////////////////////////////////

  let displayArtists;

  if (typeOfResults === "artists") displayArtists = (
    <>
      <div className="Result-Box">
        {loadingIcon}
        {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="artists" handleClick={handleSearch} artist={r.artistName} spotify_id={r.artistId} typeOfArtists={typeOfArtists} needsPaginationSlider={needsPaginationSlider}/>)}
      </div>
      {needsPaginationSlider && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Main-Pagination-Slider-Container" sliderClass="Main-Pagination-Slider"/>}
    </>
  );

////////////////////////////////////////////////////  DISPLAY ALBUMS  ////////////////////////////////////////////////////

  let displayAlbums;

  if (typeOfResults === "albums") displayAlbums = (
    <>
      <div className="Browse-Albums">
        {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="albums" handleClick={handleSearch} name={r.albumName} id={r.albumId} image={r.albumImg} typeOfAlbums={typeOfAlbums}/>)}
      </div>
      {needsPaginationSlider && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Main-Pagination-Slider-Container" sliderClass="Main-Pagination-Slider"/>}
    </>
  );

////////////////////////////////////////////////////  DISPLAY TRACKS  ////////////////////////////////////////////////////

  let displayTracks;

  if (typeOfResults === "tracks") displayTracks = (
    <>
      <div className="Result-Box">
        {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="tracks" handleClick={handleSearch} artistName={r.artistName} trackName={r.trackName} musicObject={r} typeOfTracks={typeOfTracks} needsPaginationSlider={needsPaginationSlider}/>)}
      </div>
      {needsPaginationSlider && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Main-Pagination-Slider-Container" sliderClass="Main-Pagination-Slider"/>}
    </>
  );


////////////////////////////////////////////////////  DISPLAY GENRES  ////////////////////////////////////////////////////

  let displayGenres;

  if (typeOfResults === "genres") displayGenres = (
    <>
      <div className="Result-Box">
        {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="genres" handleClick={handleSearch} genre={r}/>)}
      </div> 
      {needsPaginationSlider && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Main-Pagination-Slider-Container" sliderClass="Main-Pagination-Slider"/>}
      {!needsPaginationSlider && <div className="Main-Pagination-Slider-Placeholder"></div>}
    </>
  );

////////////////////////////////////////////////////  DANCEABILITY RESULTS  ////////////////////////////////////////////////////

  let displayDanceabilityTracks;

  if (typeOfResults === "danceability-results") displayDanceabilityTracks = (
    <>
      <div className="Danceability-Result-Box">
        {resultsArray.length && resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="danceability-results" handleClick={handleSearch} artist={r.artistName} album={r.albumName} track={r.trackName} musicObject={r} typeOfTracks="danceability"/>)}
      </div>
      {needsPaginationSlider && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Danceability-Pagination-Slider-Container" sliderClass="Danceability-Pagination-Slider"/>}
      {!needsPaginationSlider && <div className="Temp-v2"></div>}
    </>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      {displaySearchResults}
      {displayArtists}
      {displayAlbums}
      {displayTracks}
      {displayGenres}
      {displayDanceabilityTracks}
    </>
  );
};

export default SearchResultList;