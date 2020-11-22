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
    <div className="Danceability-Result-Container">
    <button onClick={handleSearchClick} className="Result-Subheader">{<span className="Result-Header">{props.track}</span>} {<br></br>} by {props.artist} on {props.album}</button>
  </div>
  );

  let displayDanceabilityResults;

  if (props.typeOfResults === "danceability-results") displayDanceabilityResults = (
    <div className="Danceability-Result-Container">
    <button onClick={handleSearchClick} className="Result-Subheader">{<span className="Result-Header">{props.track}</span>} {<br></br>} by {props.artist} on {props.album}</button>
  </div>
  );

  let displayArtists;

  if (props.typeOfResults === "artists") displayArtists = (
    <div className="Main-Result-Container">
    <p onClick={handleArtistsClick} className="Result-Main">{props.artist}</p>
  </div>
  );

  let displayAlbums;

  if (props.typeOfResults === "albums") displayAlbums = (
    <div className="Album">
      <img onClick={handleAlbumClick} src={props.image} alt=""/>
    </div>
  );

  // let displayAlbums;

  // if (props.typeOfResults === "albums" && props.inDatabase) displayAlbums = (
  //   <div className="Album">
  //     <img onClick={handleAlbumClick} src={props.image} alt=""/>
  //   </div>
  // );

  // if (props.typeOfResults === "albums" && !props.inDatabase) displayAlbums = (
  //   <div className="Album-No-Database">
  //     <img onClick={handleAlbumClick} src={props.image} alt=""/>
  //   </div>
  // );

  let displayTracks;
  
  if (props.typeOfResults === "tracks") displayTracks = (
    <div className="Main-Result-Container">
      <p onClick={handleTrackClick} className="Result-Main">{props.trackName}</p>
    </div>
  );

  // let displayTracks;
  // //DISPLAYS TRACKS THAT ARE 100% OPACITY SINCE WE HAVE LYRICS
  // if (props.typeOfResults === "tracks" && props.hasLyrics) displayTracks = (
  //   <button onClick={handleTrackClick} className="Browse-Result">{props.trackName}</button>
  // );

  // //DISPLAYS TRACKS THAT ARE 20% OPACITY SINCE THERE ARE NO LYRICS IN THE DATABSE
  // if (props.typeOfResults === "tracks" && !props.hasLyrics) displayTracks = (
  //   <button onClick={handleTrackClick} className="Browse-Result-No-Lyrics">{props.trackName}</button>
  // );

////////////////////////////////////////////////////  BROWSE BY GENRE  ////////////////////////////////////////////////////

  let displayGenres;

  if (props.typeOfResults === "genres") displayGenres = (
    <div className="Main-Result-Container">
    <p onClick={handleGenreClick} className="Result-Main">{props.genre}</p>
  </div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
    {displaySearchResults}
    {displayDanceabilityResults}
    {displayArtists}
    {displayAlbums}
    {displayTracks}
    {displayGenres}
    </>
  );
});

export default SearchResult;