import React, {useState} from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import Slider from '@material-ui/core/Slider';

const DanceabilitySlider = ({handleSliderMouseMove}) => {
  const [sliderVal, setSliderVal] = useState(0);

  const handleChange = (event, newValue) => {
    setSliderVal(newValue);
    console.log("Slider Value: ", newValue);
    handleSliderMouseMove(newValue);
  };


// const Danceability = createMuiTheme({
//     overrides: {
//       MuiSlider: {
//         root: {
//           color: "#52af77",
//           height: 8
//         },
//         thumb: {
//           height: 10,
//           width: 48,
//           backgroundColor: "#fff",
//           border: "2px solid currentColor",
//           marginTop: -8,
//           marginLeft: -12,
//           "&:focus,&:hover,&$active": {
//             boxShadow: "inherit"
//           }
//         },
//         active: {},
//         valueLabel: {
//           left: "calc(-50% + 14px)",
//           top: -22,
//           "& *": {
//             background: "transparent",
//             color: "#000"
//           }
//         },
//         track: {
//           height: 8,
//           borderRadius: 4
//         },
//         rail: {
//           height: 8,
//           borderRadius: 4
//         }
//       }
//     }
//   });


////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
   <Slider className="Danceability-Slider" color="" value={sliderVal} max={1} min={0} step={0.01} onChange={handleChange} aria-labelledby="continuous-slider" valueLabelDisplay="auto" scale={(x) => x * 100}/>
  );
};

export default DanceabilitySlider;