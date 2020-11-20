import React, {memo} from 'react';

const SearchResult = memo((props) => {

  const handleSearchClick = () => {
    props.handleClick(props.musicObject);
  }

  const handleArtistsClick = () => {
    props.handleClick(props.spotify_id);
  }

  const handleAlbumClick = () => {
    props.handleClick(props.id);
  }

  const handleTrackClick = () => {
    console.log("Here are the track props: ", props);
    props.handleClick(props.musicObject);
  }

  const handleGenreClick = () => {
    console.log("Here are the genre props: ", props);
    props.handleClick(props.genre);
  }

////////////////////////////////////////////////////  BROWSE BY ARTISTS  ////////////////////////////////////////////////////

  let displaySearchResults;

  if (props.typeOfResults === "search-results") displaySearchResults = (
    <button onClick={handleSearchClick} className="SearchResult">"{props.track}" by {props.artist} on {props.album}</button>
  );

  let displayArtists;

  if (props.typeOfResults === "artists") displayArtists = (
            // artists.map(artist => <button onClick={() => handleArtistClick(artist.spotify_id, artist.name)}>{artist.name}</button>)
  <button onClick={handleArtistsClick} className="BrowseArtists">{props.artist}</button>
    // resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="artists" handleClick={handleSearch} artist={r.artists[0].name} album={r.album.name} track={r.name}/>)
  );

  let displayAlbums;

  if (props.typeOfResults === "albums") displayAlbums = (
      //       {albums.map(a => <Album className="Album" key={a.id} id={a.id} handleAlbumClick={handleAlbumClick} releaseDate={a.release_date} albumType={a.album_type} name={a.name} image={a.images[1].url}/>)}
    <div className="Album">
      <img onClick={handleAlbumClick} src={props.image} alt=""/>
    </div>
  );


  let displayTracks;

  if (props.typeOfResults === "tracks") displayTracks = (
            // artists.map(artist => <button onClick={() => handleArtistClick(artist.spotify_id, artist.name)}>{artist.name}</button>)
  <button onClick={handleTrackClick} className="BrowseArtists">{props.trackName}</button>
    // resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="artists" handleClick={handleSearch} artist={r.artists[0].name} album={r.album.name} track={r.name}/>)
  );

////////////////////////////////////////////////////  BROWSE BY GENRE  ////////////////////////////////////////////////////

  let displayGenres;

  if (props.typeOfResults === "genres") displayGenres = (
            // artists.map(artist => <button onClick={() => handleArtistClick(artist.spotify_id, artist.name)}>{artist.name}</button>)
  <button onClick={handleGenreClick} className="BrowseArtists">{props.genre}</button>
    // resultsInView.map((r, i) => <SearchResult key={i} index={i} typeOfResults="artists" handleClick={handleSearch} artist={r.artists[0].name} album={r.album.name} track={r.name}/>)
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
    {displaySearchResults}
    {displayArtists}
    {displayAlbums}
    {displayTracks}
    {displayGenres}
    </>
  );
});

export default SearchResult;