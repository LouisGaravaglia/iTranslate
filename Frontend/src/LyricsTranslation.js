import React,  {useRef, useEffect, useCallback} from 'react';
import './App.css';
//COMPONENT IMPORTS
import DisplayLyrics from "./DisplayLyrics";
import SearchBar from "./SearchBar";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "./actionCreators/getTranslationCreator";

function LyricsTranslation({selectedTrackId}) {
  //REDUX STORE
  const dispatch = useDispatch();
  const languages = useSelector(store => store.languages);
  const translation = useSelector(store => store.translation);
  const lyrics = useSelector(store => store.lyrics);
  //REFS FOR PAGE TRAVERSAL
  const lyricsTranslationRef = useRef();
  const selectLanguageRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    }

  }, []);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(translation, lyricsTranslationRef);}, [translation, lyricsTranslationRef, scrollToNextDiv]);

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const handleLanguageSearchSubmit = async (searchVal) => {
    dispatch(getTranslation(searchVal, languages, selectedTrackId, lyrics));   
  }

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY LYRICS AND TRANSLATION
  let LyricsTranslationDiv;
  
  if (translation && translation !== "Could not read language value")  LyricsTranslationDiv = (
      <div className="Browse-Lyrics-Translation" ref={lyricsTranslationRef}>
        <DisplayLyrics lyrics={lyrics} translation={translation}/>
      </div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      <div ref={selectLanguageRef}>
        <SearchBar header="Select which language you'd like your lyrics translated to!" handleSubmit={handleLanguageSearchSubmit}/>
      </div>
      {LyricsTranslationDiv}
  </>
  );
}

export default LyricsTranslation;
