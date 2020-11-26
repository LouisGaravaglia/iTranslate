import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

//CUSTOM STYLE FOR THE MUI SLIDER
const MyDanceabilitySlider = withStyles({
    root: {
    color: "#777777",
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
      backgroundColor: "transparent",
      color: "#885511"
    }
  },
  track: {
    color: "#777777",
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

const DanceabilitySlider = ({handleSliderMouseMove}) => {
  const [sliderVal, setSliderVal] = useState(0);

////////////////////////////////////////////////////  HANDLE CHANGE FUNCTION  ////////////////////////////////////////////////////

  const handleChange = (event, newValue) => {
    setSliderVal(newValue);
    handleSliderMouseMove(newValue);
  };

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className="Danceability-Slider-Container-v2">
   <MyDanceabilitySlider className="Danceability-Slider-Item-v2" color="" value={sliderVal} max={1} min={0} step={0.01} onChange={handleChange} aria-labelledby="continuous-slider" valueLabelDisplay="off" scale={(x) => x * 100}/>
  </div>
  );
};

export default DanceabilitySlider;