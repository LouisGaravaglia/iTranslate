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
    <div className="Browse-Artists">
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="search-results" handleClick={handleSearch} artist={r.artistName} album={r.albumName} track={r.trackName} musicObject={r}/>)}
      {resultsArray.length > itemsPerPage && <PaginationSlider resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} />}
     </div>
    </>
  );

////////////////////////////////////////////////////  BROWSE BY ARTISTS  ////////////////////////////////////////////////////

  let displayArtists;

  if (typeOfResults === "artists") displayArtists = (
    // artists.map(artist => <button onClick={() => handleArtistClick(artist.spotify_id, artist.name)}>{artist.name}</button>)
    <div className="Browse-Artists">
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="artists" handleClick={handleSearch} artist={r.name} spotify_id={r.spotify_id}/>)}
      {resultsArray.length > itemsPerPage && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} />}
    </div>
  );

  let displayAlbums;

  if (typeOfResults === "albums") displayAlbums = (
    //{albums.map(a => <Album className="Album" key={a.id} id={a.id} handleAlbumClick={handleAlbumClick} releaseDate={a.release_date} albumType={a.album_type} name={a.name} image={a.images[1].url}/>)}
    <div className="Browse-Albums">
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="albums" handleClick={handleSearch} id={r.id} image={r.images[1].url}/>)}
      {resultsArray.length > itemsPerPage && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} />}
    </div>
  );

  let displayTracks;

  if (typeOfResults === "tracks") displayTracks = (
     //{tracks.map(t => <Track key={t.id} id={t.id} handleTrackClick={handleTrackClick} trackName={t.name} artistName={selectedArtist}/>)}
    
    <div className="Browse-Artists">
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="tracks" handleClick={handleSearch} artistName={r.artistName} trackName={r.trackName} musicObject={r}/>)}
      {resultsArray.length > itemsPerPage && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} />}
    </div>
  );


////////////////////////////////////////////////////  BROWSE BY GENRE  ////////////////////////////////////////////////////

  let displayGenres;

  if (typeOfResults === "genres") displayGenres = (
    // artists.map(artist => <button onClick={() => handleArtistClick(artist.spotify_id, artist.name)}>{artist.name}</button>)
    <div className="Browse-Artists">
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="genres" handleClick={handleSearch} genre={r}/>)}
      {resultsArray.length > itemsPerPage && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} />}
    </div>
  );

////////////////////////////////////////////////////  BROWSE BY DANCEABILITY  ////////////////////////////////////////////////////

  let displayDanceabilityTracks;

  if (typeOfResults === "danceability-tracks") displayDanceabilityTracks = (
    <>
      <div className="Danceability-Tracks">
        {resultsArray.length && resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="search-results" handleClick={handleSearch} artist={r.artistName} album={r.albumName} track={r.trackName} musicObject={r}/>)}
        {/* {!resultsArray.length && <button className="BrowseArtists">NO TRACKS AVAILABLE WITH THAT DANCEABILITY SCORE</button>} */}
      </div>
      {resultsArray.length > itemsPerPage && <PaginationSlider  resultsArray={resultsArray} itemsPerPage={itemsPerPage} handleSliderChange={updateResultsInView} />}
      {resultsArray.length <= itemsPerPage && <div className="Pagination-Slider-Placeholder"></div>}
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