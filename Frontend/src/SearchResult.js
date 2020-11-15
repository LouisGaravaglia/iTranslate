import React, {memo} from 'react';

const SearchResult = memo(({index, getLyrics, artist, album, track, trackId, artistId, albumId}) => {
  console.log("SearchResult Re-rendering");
const handleClick = () => {
  getLyrics(artist, track, index);
}
  return (
    // <button onClick={handleClick} className="SearchResult">Artist: {artist} / Album: {album} / Track: {track}</button>
     <button onClick={handleClick} className="SearchResult">"{track}" by {artist} on {album}</button>

  );
});

    // <div className="SearchResult">
    //   <p>Artist: {artist} / Album: {album} / Track: {track}</p>
    //   <button onClick={handleClick}>GET LYRICS</button>
    // </div>

export default SearchResult;