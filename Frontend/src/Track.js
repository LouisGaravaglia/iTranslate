import React,  {useState} from 'react';
import './App.css';
import SpotifyApi from "./SpotifyAPI";


function Track({trackName, id, handleTrackClick, artistName}) {

  const handleClick = () => {
    handleTrackClick(id, artistName, trackName);
  }


  return (
    <div className="Track">
       <button onClick={handleClick}>{trackName}</button>
    </div>
  );
}

export default Track;
