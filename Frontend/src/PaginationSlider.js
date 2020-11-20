import React, {useState, memo} from 'react';
import Slider from '@material-ui/core/Slider';

const PaginationSlider = memo(({resultsArray, itemsPerPage, handleSliderChange}) => {
  const [sliderVal, setSliderVal] = useState(0);
  const multipleOf = resultsArray.length % itemsPerPage === 0;
  let maxSliderVal = Math.floor(resultsArray.length / itemsPerPage);
  console.log("PaginationSlider re-rendering");

  if (!multipleOf) maxSliderVal += 1;

  const handleChange = (event, newValue) => {
    setSliderVal(newValue);
    handleSliderChange(newValue);
   
  };

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <Slider className="Pagination-Slider" color="" value={sliderVal} max={maxSliderVal - 1} min={0} step={1} onChange={handleChange} aria-labelledby="continuous-slider" track={false}/>
  );
});

export default PaginationSlider;