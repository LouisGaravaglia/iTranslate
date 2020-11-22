import React, {useState} from 'react';
import SearchResult from "./SearchResult";
import PaginationSlider from "./PaginationSlider";

const SearchResultList = ({resultsArray, handleSearch, itemsPerPage, typeOfResults}) => {
  const [sliderVal, setSliderVal] = useState(0);
  const resultsInView = resultsArray.slice(sliderVal * itemsPerPage, (sliderVal * itemsPerPage) + itemsPerPage);
  console.log("resultsArray: ", resultsArray);

  const updateResultsInView = (val) => {
    setSliderVal(val);
  }

////////////////////////////////////////////////////  SEARCH ROUTE  ////////////////////////////////////////////////////

  let displaySearchResults;

  if (typeOfResults === "search-results") displaySearchResults = (
    <>
    <div className="Danceability-Tracks-v2">
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="search-results" handleClick={handleSearch} artist={r.artistName} album={r.albumName} track={r.trackName} musicObject={r}/>)}
     </div> 
      {resultsArray.length > itemsPerPage && <PaginationSlider resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Main-Pagination-Slider-Container" sliderClass="Main-Pagination-Slider"/>}
      {resultsArray.length <= itemsPerPage && <div className="Main-Pagination-Slider-Placeholder"></div>}

    </>
  );

////////////////////////////////////////////////////  BROWSE BY ARTISTS  ////////////////////////////////////////////////////

  let displayArtists;

  if (typeOfResults === "artists") displayArtists = (
    // artists.map(artist => <button onClick={() => handleArtistClick(artist.spotify_id, artist.name)}>{artist.name}</button>)
   <>
   <div className="Danceability-Tracks-v2">
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="artists" handleClick={handleSearch} artist={r.artistName} spotify_id={r.artistId}/>)}
       </div>
      {resultsArray.length > itemsPerPage && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Main-Pagination-Slider-Container" sliderClass="Main-Pagination-Slider"/>}
      {resultsArray.length <= itemsPerPage && <div className="Main-Pagination-Slider-Placeholder"></div>}

 </>
  );

  let displayAlbums;

  if (typeOfResults === "albums") displayAlbums = (
 <>
    <div className="Browse-Albums">
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="albums" handleClick={handleSearch} name={r.albumName} id={r.albumId} image={r.albumImg}/>)}
    </div>
      {resultsArray.length > itemsPerPage && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Main-Pagination-Slider-Container" sliderClass="Main-Pagination-Slider"/>}
       {resultsArray.length <= itemsPerPage && <div className="Main-Pagination-Slider-Placeholder"></div>}
 
 </>
  );

  let displayTracks;

  if (typeOfResults === "tracks") displayTracks = (
     //{tracks.map(t => <Track key={t.id} id={t.id} handleTrackClick={handleTrackClick} trackName={t.name} artistName={selectedArtist}/>)}
    <>
    <div className="Danceability-Tracks-v2">
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="tracks" handleClick={handleSearch} artistName={r.artistName} trackName={r.trackName} musicObject={r}/>)}
       </div>
      {resultsArray.length > itemsPerPage && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Main-Pagination-Slider-Container" sliderClass="Main-Pagination-Slider"/>}
         {resultsArray.length <= itemsPerPage && <div className="Main-Pagination-Slider-Placeholder"></div>}

   </>
  );


////////////////////////////////////////////////////  BROWSE BY GENRE  ////////////////////////////////////////////////////

  let displayGenres;

  if (typeOfResults === "genres") displayGenres = (
<>
    <div className="Danceability-Tracks-v2">
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="genres" handleClick={handleSearch} genre={r}/>)}
     </div> 
      {resultsArray.length > itemsPerPage && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Main-Pagination-Slider-Container" sliderClass="Main-Pagination-Slider"/>}
         {resultsArray.length <= itemsPerPage && <div className="Main-Pagination-Slider-Placeholder"></div>}

    </>
  );

////////////////////////////////////////////////////  BROWSE BY DANCEABILITY  ////////////////////////////////////////////////////

  let displayDanceabilityTracks;

  if (typeOfResults === "danceability-tracks") displayDanceabilityTracks = (
    <>
      <div className="Danceability-Tracks-v2">
        {resultsArray.length && resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="danceability-results" handleClick={handleSearch} artist={r.artistName} album={r.albumName} track={r.trackName} musicObject={r}/>)}
        {/* {!resultsArray.length && <button className="BrowseArtists">NO TRACKS AVAILABLE WITH THAT DANCEABILITY SCORE</button>} */}
      </div>
      {resultsArray.length > itemsPerPage && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} containerClass="Danceability-Pagination-Slider-Container" sliderClass="Danceability-Pagination-Slider"/>}
      {resultsArray.length <= itemsPerPage && <div className="Pagination-Slider-Placeholder-v2"></div>}
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