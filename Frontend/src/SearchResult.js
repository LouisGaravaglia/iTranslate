import React, {useState} from 'react';
import SpotifyAPI from "./SpotifyAPI";
import LyricsAPI from "./LyricsAPI";
import IBMWatsonAPI from "./IBMWatsonAPI";

const Search = ({artist, album, track, trackId, artistId, albumId}) => {

  return (
    <div className="SearchResult">
      <p>Artist: {artist} / Album: {album} / Track: {track}</p>
      <button>GET LYRICS</button>
    </div>
  );
};

export default Search;