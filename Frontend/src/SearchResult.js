import React from 'react';

const SearchResult = ({index, getLyrics, artist, album, track, trackId, artistId, albumId}) => {

const handleClick = () => {
  getLyrics(artist, track, index);
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