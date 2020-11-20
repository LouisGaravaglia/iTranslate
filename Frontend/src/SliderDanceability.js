import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';

const SearchResultList = ({handleSliderMouseUp}) => {
  const [sliderVal, setSliderVal] = useState(0);
  // const multipleOf = resultsArray.length % itemsPerPage === 0;
  // let maxSliderVal = Math.floor(resultsArray.length / itemsPerPage);
  // const resultsInView = resultsArray.slice(sliderVal * itemsPerPage, (sliderVal * itemsPerPage) + itemsPerPage);
  // console.log("SearchResultList re-rendering");
  // console.log("resultsArray: ", resultsArray);

  // if (!multipleOf) maxSliderVal += 1;

  const handleChange = (event, newValue) => {
    setSliderVal(newValue);
    console.log("Slider Value: ", sliderVal);
  };

  const handleMouseUp = () => {
    handleSliderMouseUp(sliderVal);
  }



////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className="Browse-Artists">
      <Slider className="Search-Slider" color="" value={sliderVal} max={1} min={0} step={0.01} onChange={handleChange} onMouseUp={handleMouseUp}aria-labelledby="continuous-slider" />
    </div>
  );
};

export default SearchResultList;