import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import SearchResult from "./SearchResult";

const SearchResultList = ({resultsArray, handleSearch}) => {
  const [value, setValue] = useState();
  const [paginateVal, setPaginateVal] = useState(0);

  const resultsInView = resultsArray.slice(paginateVal, paginateVal + 5);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} getLyrics={handleSearch} artist={r.artists[0].name} album={r.album.name} track={r.name} trackId={r.id} artistId={r.artists[0].id} albumId={r.album.id}/>)}
      <Slider className="Search-Slider" value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
    </>
  );
};



export default SearchResultList;