import React, {useState} from 'react';
import SpotifyAPI from "./SpotifyAPI";
import LyricsAPI from "./LyricsAPI";
import IBMWatsonAPI from "./IBMWatsonAPI";

const SearchResult = ({getLyrics, artist, album, track, trackId, artistId, albumId}) => {

const handleClick = () => {
  getLyrics(artist, track);
}
  return (
    // <button onClick={handleClick} className="SearchResult">Artist: {artist} / Album: {album} / Track: {track}</button>
     <button onClick={handleClick} className="SearchResult">"{track}" by {artist} on {album}</button>

  );
};

    // <div className="SearchResult">
    //   <p>Artist: {artist} / Album: {album} / Track: {track}</p>
    //   <button onClick={handleClick}>GET LYRICS</button>
    // </div>

export default SearchResult;