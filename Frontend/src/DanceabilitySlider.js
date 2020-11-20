import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';

const DanceabilitySlider = ({handleSliderMouseMove}) => {
  const [sliderVal, setSliderVal] = useState(0);
  // const multipleOf = resultsArray.length % itemsPerPage === 0;
  // let maxSliderVal = Math.floor(resultsArray.length / itemsPerPage);
  // const resultsInView = resultsArray.slice(sliderVal * itemsPerPage, (sliderVal * itemsPerPage) + itemsPerPage);
  // console.log("SearchResultList re-rendering");
  // console.log("resultsArray: ", resultsArray);

  // if (!multipleOf) maxSliderVal += 1;

  const handleChange = (event, newValue) => {
    // const newSliderVal = newValue;
    
    // newSliderVal.toFixed(2);
    // // if (new7, 14, 28, 29, 55, 56, 57, 58)
    setSliderVal(newValue);
    console.log("Slider Value: ", newValue);
    handleSliderMouseMove(newValue);
  };

  // const handleMouseUp = () => {
  //   handleSliderMouseUp(sliderVal);
  // }



////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <Slider className="Danceability-Slider" color="" value={sliderVal} max={1} min={0} step={0.01} onChange={handleChange} aria-labelledby="continuous-slider" valueLabelDisplay="on" scale={(x) => x * 100}/>
  );
};

export default DanceabilitySlider;