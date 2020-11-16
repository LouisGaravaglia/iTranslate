import React, {memo} from 'react';

const SearchResult = memo((props) => {

  const handleSearchClick = () => {
    props.handleClick(props.artist, props.track, props.index);
  }

  const handleArtistsClick = () => {
    props.handleClick(props.spotify_id, props.artist);
  }

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  let displaySearchResults;

  if (props.typeOfResults === "search-results") displaySearchResults = (
    <button onClick={handleSearchClick} className="SearchResult">"{props.track}" by {props.artist} on {props.album}</button>
  );

  let displayArtists;

  if (props.typeOfResults === "artists") displayArtists = (
            // artists.map(artist => <button onClick={() => handleArtistClick(artist.spotify_id, artist.name)}>{artist.name}</button>)
  <button onClick={handleArtistsClick} className="SearchResult">{props.artist}</button>
    // resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="artists" handleClick={handleSearch} artist={r.artists[0].name} album={r.album.name} track={r.name}/>)
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
    {displaySearchResults}
    {displayArtists}
    </>
  );
});

export default SearchResult;