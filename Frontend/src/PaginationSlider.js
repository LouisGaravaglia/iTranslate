import React, {useState, memo} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';



const MyPaginationSlider = withStyles({
         root: {
          color: "#3880ff",
          height: 8
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: "#fff",
          border: "2px solid currentColor",
          marginTop: -10,
          marginLeft: -12,
          "&:focus,&:hover,&$active": {
            boxShadow: "inherit"
          }
        },
        active: {},
        valueLabel: {
          left: "calc(-50% + 14px)",
          top: -22,
          "& *": {
            background: "transparent",
            color: "#000"
          }
        },
        track: {
          height: 8,
          borderRadius: 4
        },
        rail: {
          height: 4,
          borderRadius: 4,
          opacity: 0.5,
          backgroundColor: "#bfbfbf"

        }
})(Slider);

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


  <MyPaginationSlider className="Pagination-Slider" color="" value={sliderVal} max={maxSliderVal - 1} min={0} step={1} onChange={handleChange} aria-labelledby="continuous-slider" track={false}/>

  );
});

export default PaginationSlider;