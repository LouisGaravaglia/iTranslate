import React, {memo, useState} from 'react';
import BackendCall from "./BackendCall";
import {useSpring, animated} from 'react-spring';
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

  // const springProps = useSpring({opacity: 1, color: 'red'});

  //   const springProps = useSpring({
  //   // color: props.fontColor1,
  //   color: 'linear-gradient(#fff, #000000)',
  //   config: {duration: 300}
  // });



////////////////////////////////////////////////////  SEARCH RESULTS  ////////////////////////////////////////////////////

  let displaySearchResults;

  if (props.typeOfResults === "search-results") displaySearchResults = (
    <div className="Main-Result-Container">
      <p onClick={handleSearchClick} className="Result-Subheader">{<span className="Result-Header">{props.track}</span>} {<br></br>} by {props.artist} on {props.album}</p>
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

  let displayArtists;

  if (props.typeOfResults === "artists") displayArtists = (
    <div className="Main-Result-Container">
      <p onClick={handleArtistsClick} className="Result-Main">{props.artist}</p>
    </div>
  );

////////////////////////////////////////////////////  ALBUMS  ////////////////////////////////////////////////////

  let displayAlbums;

  if (props.typeOfResults === "albums") displayAlbums = (
    <div className="Album" onMouseEnter={() => setAlbumHover(true)} onMouseLeave={() => setAlbumHover(false)}>
      {albumHover && 
      <div className="Album-Name-Box" onClick={handleAlbumClick}>
      <p className="Album-Name">{props.name}</p>
      </div>
      }
      <img src={props.image} alt=""/>
    </div>
  );

////////////////////////////////////////////////////  TRACKS  ////////////////////////////////////////////////////

  let displayTracks;
  
  if (props.typeOfResults === "tracks") displayTracks = (
    <div className="Main-Result-Container">
      <p onClick={handleTrackClick} className="Result-Main">{props.trackName}</p>
    </div>
  );

////////////////////////////////////////////////////  GENRES  ////////////////////////////////////////////////////

  let displayGenres;

  if (props.typeOfResults === "genres") displayGenres = (
    <div className="Main-Result-Container">
    <div className="Result-Main-TopFiller"></div>
      <Hover rotation={10} timing={100}>
        <p onClick={handleGenreClick} dataInfo="testing" className="Result-Main Result-Main-Genres">{props.genre}</p>
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