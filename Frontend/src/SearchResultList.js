import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import SearchResult from "./SearchResult";

const SearchResultList = ({resultsArray, handleSearch}) => {
  const [sliderVal, setSliderVal] = useState(0);
  const [paginateVal, setPaginateVal] = useState(0);
  const resultsInView = resultsArray.slice(paginateVal, paginateVal + 5);
  const pivotVal = Math.floor((100 / resultsArray.length) * 5);

  const handleChange = (event, newValue) => {
    setSliderVal(newValue);
    if (sliderVal >= 0 && sliderVal <= pivotVal && resultsArray.length > 0 ) {
      setPaginateVal(0);
    } else if (sliderVal > pivotVal && sliderVal <= (pivotVal * 2) && resultsArray.length > 5) {
      setPaginateVal(5);
    } else if (sliderVal > (pivotVal * 2) && sliderVal <= (pivotVal * 3) && resultsArray.length > 10 ) {
      setPaginateVal(10);
    } else if (sliderVal > (pivotVal * 3) && sliderVal <= (pivotVal * 4) && resultsArray.length > 15 ) {
      setPaginateVal(15);
    } 
    console.log("Slider Value: ", sliderVal);
  };

  // const handleChange = (event, newValue) => {
  //   setSliderVal(newValue);
  //   if (sliderVal >= 0 && sliderVal <= 25 && resultsArray.length > 0 ) {
  //     setPaginateVal(0);
  //   } else if (sliderVal > 25 && sliderVal <= 50 && resultsArray.length > 5) {
  //     setPaginateVal(5);
  //   } else if (sliderVal > 50 && sliderVal <= 75 && resultsArray.length > 10 ) {
  //     setPaginateVal(10);
  //   } else if (sliderVal > 75 && sliderVal <= 100 && resultsArray.length > 15 ) {
  //     setPaginateVal(15);
  //   } 
  //   console.log("Slider Value: ", sliderVal);
  // };


  return (
    <>
      {resultsInView.map((r, i) => <SearchResult key={i} index={i} getLyrics={handleSearch} artist={r.artists[0].name} album={r.album.name} track={r.name} trackId={r.id} artistId={r.artists[0].id} albumId={r.album.id}/>)}
      {resultsArray.length > 5 && <Slider className="Search-Slider" color="secondary" value={sliderVal} onChange={handleChange} aria-labelledby="continuous-slider" />}
    </>
  );
};



export default SearchResultList;