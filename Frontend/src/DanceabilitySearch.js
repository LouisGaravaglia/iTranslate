import React,  {useState} from 'react';
import { Spring } from 'react-spring/renderprops';
import './App.css';
//COMPONENT IMPORTS
import DanceabilitySlider from "./DanceabilitySlider";
import Tracks from "./Tracks";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getDanceabilityTracks} from "./actionCreators/BrowseRoute/Danceability/getDanceabilityTracksCreator";

function DanceabilitySearch() {
  const [sliderVal, setSliderVal] = useState(0);
  const dispatch = useDispatch();
  const tracks = useSelector(store => store.tracks);

////////////////////////////////////////////////////  HANDLE SLIDER MOVE FUNCTIONS  ////////////////////////////////////////////////////

  const handleSliderMouseMove = async (val) => {
    setSliderVal(val);
    let upperLimit = (val + 0.01).toFixed(2);
    dispatch(getDanceabilityTracks(val, upperLimit));
  };

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <Spring
      from={{opacity: 0}}
      to={{opacity: 1}}
      config={{delay: 300, duration: 300}}
    >
      {props => (
        <div style={props}>

          <div className="Browse-Danceability-v2">
            <h1>{(sliderVal * 100).toFixed(0)}</h1>
            <DanceabilitySlider handleSliderMouseMove={handleSliderMouseMove} />
            {!tracks && <><div className="Danceability-No-Results-Container"> <p className="Danceability-No-Results">KEEP SLIDING!</p></div> <div className="Pagination-Slider-Placeholder-v2"></div></>}
            {tracks && <Tracks results={tracks} typeOfResults={"danceability-results"} itemsPerPage={1} />}
          </div>

        </div>
      )}
    </Spring>
  );
};

export default DanceabilitySearch;