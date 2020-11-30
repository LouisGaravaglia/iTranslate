import React, {memo, useState} from 'react';
import BackendCall from "./BackendCall";
import Hover from "./Hover";

const SearchResult = memo((props) => {
  const [albumHover, setAlbumHover] = useState(false);

  const handleSearchClick = async () => {
    const updatedTrack = await BackendCall.consolidateSelectedSearchResultInfo(props.musicObject)
    props.handleClick(updatedTrack);
  };

  const handleArtistsClick = () => {
    props.handleClick(props.spotify_id);
  };

  const handleAlbumClick = () => {
    props.handleClick(props.id);
  };

  const handleTrackClick = () => {
    props.handleClick(props.musicObject);
  };

  const handleGenreClick = () => {
    props.handleClick(props.genre);
  };

////////////////////////////////////////////////////  SEARCH RESULTS  ////////////////////////////////////////////////////

  let displaySearchResults;

  if (props.typeOfResults === "search-results") displaySearchResults = (
    <div className="Main-Result-Container">
    <div className="Result-Main-TopFiller"></div>
      <Hover scale={1.05}>
        <p onClick={handleSearchClick} className="Result-Subheader Search-Track-Subheader">{<span className="Result-Header Search-Track-Header">{props.track}</span>} {<br></br>} by {props.artist} on {props.album}</p>
      </Hover>
    </div>
  );

////////////////////////////////////////////////////  DANCEABILITY RESULTS  ////////////////////////////////////////////////////

  let displayDanceabilityResults;

  if (props.typeOfResults === "danceability-results") displayDanceabilityResults = (
    <div className="Danceability-Result-Container">
      <p onClick={handleTrackClick} className="Result-Subheader">{<span className="Result-Header">{props.track}</span>} {<br></br>} by {props.artist} on {props.album}</p>
    </div>
  );

////////////////////////////////////////////////////  ARTISTS  ////////////////////////////////////////////////////

  let artistClassName;

  if (props.typeOfArtists === "genre") artistClassName = "Result-Main Genre-Artists";
  if (props.typeOfArtists === "artists") artistClassName = "Result-Main Artist-Artists";

  let displayArtists;

  if (props.typeOfResults === "artists") displayArtists = (
    <div className="Main-Result-Container">
    <div className="Result-Main-TopFiller"></div>
      <Hover scale={1.05}>
        <p onClick={handleArtistsClick} className={artistClassName}>{props.artist}</p>
      </Hover>
    </div>
  );

////////////////////////////////////////////////////  ALBUMS  ////////////////////////////////////////////////////

  let albumsClassName;

  if (props.typeOfAlbums === "genre") albumsClassName = "Album-Name Genre-Albums";
  if (props.typeOfAlbums === "artists") albumsClassName = "Result-Main Artist-Artists";

  let displayAlbums;

  if (props.typeOfResults === "albums") displayAlbums = (
    <div className="Album" onMouseEnter={() => setAlbumHover(true)} onMouseLeave={() => setAlbumHover(false)}>
      <Hover scale={1.05}>
        {albumHover && 
        <div className="Album-Name-Box" onClick={handleAlbumClick}>
        <p className={albumsClassName}>{props.name}</p>
        </div>
        }
        <img src={props.image} alt=""/>
      </Hover>
    </div>
  );

////////////////////////////////////////////////////  TRACKS  ////////////////////////////////////////////////////

  let trackClassNames;

  if (props.typeOfTracks === "artists") trackClassNames = "Result-Main Artist-Tracks";
  if (props.typeOfTracks === "genre") trackClassNames = "Result-Main Genre-Tracks";
  if (props.typeOfTracks === "danceability") trackClassNames = "Result-Main Danceability-Tracks";

  let displayTracks;
  
  if (props.typeOfResults === "tracks") displayTracks = (
    <div className="Main-Result-Container">
    <div className="Result-Main-TopFiller"></div>
      <Hover scale={1.05}>
        <p onClick={handleTrackClick} className={trackClassNames}>{props.trackName}</p>
      </Hover>
    </div>
  );

////////////////////////////////////////////////////  GENRES  ////////////////////////////////////////////////////

  let displayGenres;

  if (props.typeOfResults === "genres") displayGenres = (
    <div className="Main-Result-Container">
    <div className="Result-Main-TopFiller"></div>
      <Hover scale={1.05}>
        <p onClick={handleGenreClick} className="Result-Main Genre-Genres">{props.genre}</p>
      </Hover>
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