import React, {useState} from 'react';
import SpotifyAPI from "./SpotifyAPI";
import LyricsAPI from "./LyricsAPI";
import IBMWatsonAPI from "./IBMWatsonAPI";

const Search = ({getLyrics, artist, album, track, trackId, artistId, albumId}) => {

const handleClick = () => {
  getLyrics(artist, track);
}
  return (
    <div className="SearchResult">
      <p>Artist: {artist} / Album: {album} / Track: {track}</p>
      <button onClick={handleClick}>GET LYRICS</button>
    </div>
  );
};

export default Search;