import React,  {useState, useRef, useEffect, useCallback} from 'react';
import './App.css';
//COMPONENT IMPORTS
import LyricsTranslation from "./LyricsTranslation";
import DanceabilitySlider from "./DanceabilitySlider";
import Tracks from "./Tracks";

//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getDanceabilityTracks} from "./actionCreators/BrowseRoute/Danceability/getDanceabilityTracksCreator";

function BrowseByDanceability() {
  const [sliderVal, setSliderVal] = useState(0);
  //REDUX STORE
  const dispatch = useDispatch();
  const lyrics = useSelector(store => store.lyrics);
  const tracks = useSelector(store => store.tracks);
  const selectedTrackId = useSelector(store => store.selectedTrack.trackId);
  //REFS FOR PAGE TRAVERSAL
  const selectLanguageRef = useRef();
  const trackResultsRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    }

  }, []);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(tracks, trackResultsRef);}, [tracks, trackResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleSliderMouseMove = async (val) => {
    console.log("Here is the val: ", val);
    setSliderVal(val);
    let lowerLimit = (val - 0.10).toFixed(2);
    let upperLimit = (val + 0.10).toFixed(2);
    dispatch(getDanceabilityTracks(lowerLimit, upperLimit));
  };

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////


  //DISPLAY TRACKS FROM SELECTED ALBUM
  // let TrackResultsDiv;
  
  // if (tracks) TrackResultsDiv = (
  //   <div ref={trackResultsRef}>
  //     <Tracks results={tracks} typeOfResults={"search-results"} itemsPerPage={6} />
  //   </div>
  // );

  let LyricsAndTranslationDivs;

  if (selectedTrackId) LyricsAndTranslationDivs = (
    <div ref={selectLanguageRef}>
      <LyricsTranslation selectedTrackId={selectedTrackId} />
    </div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
    <div ref={trackResultsRef}>
    <div className="Browse-Danceability">
    <h1>{(sliderVal * 100).toFixed(0)}</h1>
      <DanceabilitySlider handleSliderMouseMove={handleSliderMouseMove} />
      </div>
      {!tracks && <div className="Browse-Danceability-extended" > </div>}
{tracks && <Tracks results={tracks} typeOfResults={"danceability-tracks"} itemsPerPage={3} />}
           </div>
      {/* {TrackResultsDiv} */}
      {LyricsAndTranslationDivs}

  </>
  );
}

export default BrowseByDanceability;
