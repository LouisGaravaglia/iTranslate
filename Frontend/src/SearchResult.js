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
    <button onClick={handleSearchClick} className="Result">{<span className="Browse-Result">{props.track}</span>} {<br></br>} by {props.artist} on {props.album}</button>
  );

  let displayArtists;

  if (props.typeOfResults === "artists") displayArtists = (
    <button onClick={handleArtistsClick} className="Browse-Result">{props.artist}</button>
  );

  let displayAlbums;

  if (props.typeOfResults === "albums" && props.inDatabase) displayAlbums = (
    <div className="Album">
      <img onClick={handleAlbumClick} src={props.image} alt=""/>
    </div>
  );

  if (props.typeOfResults === "albums" && !props.inDatabase) displayAlbums = (
    <div className="Album-No-Database">
      <img onClick={handleAlbumClick} src={props.image} alt=""/>
    </div>
  );


  let displayTracks;
  //DISPLAYS TRACKS THAT ARE 100% OPACITY SINCE WE HAVE LYRICS
  if (props.typeOfResults === "tracks" && props.hasLyrics) displayTracks = (
    <button onClick={handleTrackClick} className="Browse-Result">{props.trackName}</button>
  );

  //DISPLAYS TRACKS THAT ARE 20% OPACITY SINCE THERE ARE NO LYRICS IN THE DATABSE
  if (props.typeOfResults === "tracks" && !props.hasLyrics) displayTracks = (
    <button onClick={handleTrackClick} className="Browse-Result-No-Lyrics">{props.trackName}</button>
  );

////////////////////////////////////////////////////  BROWSE BY GENRE  ////////////////////////////////////////////////////

  let displayGenres;

  if (props.typeOfResults === "genres") displayGenres = (
    <button onClick={handleGenreClick} className="Browse-Result">{props.genre}</button>
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