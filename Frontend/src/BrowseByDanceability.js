import React,  {useState, useRef, useEffect, useCallback} from 'react';
import {useSpring, animated} from 'react-spring';
import './App.css';
//COMPONENT IMPORTS
import LyricsTranslation from "./LyricsTranslation";
import LanguageSelect from "./LanguageSelect";
import DanceabilitySearch from "./DanceabilitySearch";
import Categories from "./BrowseCategories";
//REDUX IMPORTS
import {useSelector} from "react-redux";
//CUSTOM HOOK IMPORTS
import useOnScreen from "./useOnScreen";

function BrowseByDanceability() {
  //STATE FOR ANIMATIONS
  const [bgColor, setBgColor] = useState("#ABA800");
  //REDUX STORE
  const lyrics = useSelector(store => store.lyrics);
  const selectedTrackId = useSelector(store => store.selectedTrack.trackId);
  const translation = useSelector(store => store.translation);
  //REFS FOR PAGE TRAVERSAL
  const categoryRef = useRef();
  const DanceabilitySearchRef = useRef();
  const selectLanguageRef = useRef();
  const showLyricsTranslationRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //SKIP OVER THE CATEGORIES SINCE THE USER NEEDED TO SEE THAT IN ORDER TO GET TO THIS COMPONENT
  useEffect(() => {
    const scrollPastCategories = () => {
      DanceabilitySearchRef.current.scrollIntoView({behavior: "smooth"});
    }
    scrollPastCategories();
  }, []);

  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    }

  }, []);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(translation, showLyricsTranslationRef);}, [translation, showLyricsTranslationRef, scrollToNextDiv]);

////////////////////////////////////////////////////  ANIMATION FOR BACKGROUND COLOR  ////////////////////////////////////////////////////

  const categoriesInView = useOnScreen(categoryRef, {threshold: 0.2});
  const DanceabilitySearchInView = useOnScreen(DanceabilitySearchRef, {threshold: 0.2});
  const selectLanguageInView = useOnScreen(selectLanguageRef, {threshold: 0.7});
  const LyricsTranslationInView = useOnScreen(showLyricsTranslationRef, {threshold: 0.2});

  useEffect(() => {
    const changeInView = (selectLanguageInView, LyricsTranslationInView, DanceabilitySearchInView, categoriesInView) => {
      if (selectLanguageInView) {
        setBgColor("#ABA800");
      } else if (LyricsTranslationInView) {
        setBgColor("#AB5D00");
      } else if (DanceabilitySearchInView) {
        setBgColor("#008FD1");
      } else if (categoriesInView) {
        setBgColor("#ABA800");
      }
    };
  changeInView(selectLanguageInView, LyricsTranslationInView, DanceabilitySearchInView, categoriesInView);
  }, [selectLanguageInView, LyricsTranslationInView, DanceabilitySearchInView, categoriesInView]);

  const springProps = useSpring({
    backgroundColor: bgColor,
    config: {duration: 300}
  });

////////////////////////////////////////////////////  CLICK EVENTS  ////////////////////////////////////////////////////

  const scrollToDanceability = () => {
    DanceabilitySearchRef.current.scrollIntoView({behavior: "smooth"});
  }

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY BROWSE BY ARTISTS COMPONENTS
  const ChooseCategoryDiv = (
    <animated.div onClick={scrollToDanceability} style={springProps} ref={categoryRef}>
      <Categories needAnimation={false}/>
    </animated.div>
  );

  //DISPLAY DANCEABILITY SEARCH BAR 
  const DanceabilitySearchDiv = (
    <animated.div style={springProps} ref={DanceabilitySearchRef}>
       <DanceabilitySearch />
    </animated.div>
  );

  //DISPLAY LANGUAGE SELECTION SEARCH BAR
  let LanguageSelectDiv;

  if (lyrics) LanguageSelectDiv = (
    <animated.div style={springProps} ref={selectLanguageRef}>
      <LanguageSelect selectedTrackId={selectedTrackId}/>
    </animated.div>
  );

  //DISPLAY LYRICS AND TRANSLATION
  let LyricsTranslationDiv;
  
  if (translation && translation !== "Could not read language value")  LyricsTranslationDiv = (
    <animated.div style={springProps} ref={showLyricsTranslationRef}>
      <LyricsTranslation  />
    </animated.div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      {ChooseCategoryDiv}
      {DanceabilitySearchDiv}
      {LanguageSelectDiv}
      {LyricsTranslationDiv}
    </>
  );
}

export default BrowseByDanceability;