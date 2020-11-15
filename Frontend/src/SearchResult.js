import React, {memo} from 'react';

const SearchResult = memo(({index, getLyrics, artist, album, track}) => {

  const handleClick = () => {
    getLyrics(artist, track, index);
  }

  return (
    <button onClick={handleClick} className="SearchResult">"{track}" by {artist} on {album}</button>
  );
});

export default SearchResult;