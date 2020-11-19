import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import SearchResult from "./SearchResult";

const SearchResultList = ({resultsArray, handleSearch, itemsPerPage, typeOfResults}) => {
  const [sliderVal, setSliderVal] = useState(0);
  const multipleOf = resultsArray.length % itemsPerPage === 0;
  let maxSliderVal = Math.floor(resultsArray.length / itemsPerPage);
  const resultsInView = resultsArray.slice(sliderVal * itemsPerPage, (sliderVal * itemsPerPage) + itemsPerPage);
  console.log("SearchResultList re-rendering");
  console.log("resultsArray: ", resultsArray);

  if (!multipleOf) maxSliderVal += 1;

  const handleChange = (event, newValue) => {
    setSliderVal(newValue);
    console.log("Slider Value: ", sliderVal);
  };



////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <Slider className="Search-Slider" color="" value={sliderVal} max={maxSliderVal - 1} min={0} step={1} onChange={handleChange} aria-labelledby="continuous-slider" />
  );
};

export default SearchResultList;