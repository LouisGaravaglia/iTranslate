import React,  {useState, useRef, useEffect, useCallback} from 'react';
import './App.css';
//COMPONENT IMPORTS
import LyricsTranslation from "./LyricsTranslation";
import DanceabilitySlider from "./DanceabilitySlider";
import Tracks from "./Tracks";
import LanguageSelect from "./LanguageSelect";
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
  const translation = useSelector(store => store.translation);
  //REFS FOR PAGE TRAVERSAL
  const selectLanguageRef = useRef();
  const trackResultsRef = useRef();
  const showLyricsTranslationRef = useRef();

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

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(translation, showLyricsTranslationRef);}, [translation, showLyricsTranslationRef, scrollToNextDiv]);

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleSliderMouseMove = async (val) => {
    console.log("Here is the val: ", val);
    setSliderVal(val);
    let upperLimit = (val + 0.01).toFixed(2);
    dispatch(getDanceabilityTracks(val, upperLimit));
  };

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY LANGUAGE SELECTION SEARCH BAR
  let LanguageSelectDiv;

  if (lyrics) LanguageSelectDiv = (
    <div ref={selectLanguageRef}>
      <LanguageSelect selectedTrackId={selectedTrackId}/>
    </div>
  );

  //DISPLAY LYRICS AND TRANSLATION
  let LyricsTranslationDiv;
  
  if (translation && translation !== "Could not read language value")  LyricsTranslationDiv = (
    <div ref={showLyricsTranslationRef}>
      <LyricsTranslation  />
    </div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      <div ref={trackResultsRef}>
        <div className="Browse-Danceability-v2">
          <h1>{(sliderVal * 100).toFixed(0)}</h1>
          <DanceabilitySlider classname="Danceability-Slider-v2" handleSliderMouseMove={handleSliderMouseMove} />
          {!tracks && <><div className="Danceability-No-Results-Container"> <button className="Danceability-No-Results">KEEP SLIDING!</button></div> <div className="Pagination-Slider-Placeholder-v2"></div></>}
          {tracks && <Tracks className="Result-Box" results={tracks} typeOfResults={"danceability-tracks"} itemsPerPage={1} />}
        </div>
      </div>
      {LanguageSelectDiv}
      {LyricsTranslationDiv}
    </>
  );
}

export default BrowseByDanceability;


  // return (
  //   <>
  //     <div ref={trackResultsRef}>
  //       <div className="Browse-Danceability">
  //         <h1>{(sliderVal * 100).toFixed(0)}</h1>
  //         <DanceabilitySlider handleSliderMouseMove={handleSliderMouseMove} />
  //         {!tracks && <><div className="Danceability-Tracks"> <button className="Browse-Result">KEEP SLIDING!</button></div> <div className="Pagination-Slider-Placeholder"></div></>}
  //         {tracks && <Tracks results={tracks} typeOfResults={"danceability-tracks"} itemsPerPage={1} />}
  //       </div>
  //     </div>
  //     {LyricsAndTranslationDivs}
  //   </>
  // );