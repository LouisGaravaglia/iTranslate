import React,  {useState, useRef, useEffect, useCallback} from 'react';
import {useSpring, animated} from 'react-spring';
import './App.css';
//COMPONENT IMPORTS
import LyricsTranslation from "./LyricsTranslation";
import LanguageSelect from "./LanguageSelect";
import DanceabilitySearch from "./DanceabilitySearch";
import Categories from "./BrowseCategories";
import FlashMessage from "./FlashMessage";
//REDUX IMPORTS
import {useSelector, useDispatch} from "react-redux";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetGeneralError} from "./actionCreators/handleErrorsCreator";
//CUSTOM HOOK IMPORTS
import useOnScreen from "./useOnScreen";

function BrowseByDanceability() {
  //STATE FOR ANIMATIONS
  const [bgColor, setBgColor] = useState("#8700B0");
  //REDUX STORE
  const lyrics = useSelector(store => store.lyrics);
  const selectedTrackId = useSelector(store => store.selectedTrack.trackId);
  const translation = useSelector(store => store.translation);
  const translationError = useSelector(store => store.errors.translationError);
  const languageError = useSelector(store => store.errors.languageError);
  const lyricsError = useSelector(store => store.errors.lyricsError);
  const generalError = useSelector(store => store.errors.generalError);
  const dispatch = useDispatch();
  //REFS FOR PAGE TRAVERSAL
  const categoryRef = useRef();
  const DanceabilitySearchRef = useRef();
  const selectLanguageRef = useRef();
  const showLyricsTranslationRef = useRef();
  //STATE FOR FLASH MESSAGES
  const [noLyricsFlashMessage, setNoLyricsFlashMessage] = useState(false);
  const [languageNotFoundFlashMessage, setLanguageNotFoundFlashMessage] = useState(false);
  const [translationErrorFlashMessage, setTranslationErrorFlashMessage] = useState(false);
  const [generalErrorFlashMessage, setGeneralErrorFlashMessage] = useState(false);

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //LISTENS FOR ANY CHANGES IN ERRORS IN STATE AND WILL TRIGGER FLASH MESSAGES ACCORDINGLY
  useEffect(() => {
    const displayFlashMessage = () => {

        if (lyricsError) {
          setNoLyricsFlashMessage(true);
          console.log("There is a lyrics error");
          dispatch(resetLyricsError());
        }
        if (languageError) {
          setLanguageNotFoundFlashMessage(true);
          console.log("Here is what language error is: ", languageError);
          dispatch(resetLanguageError());
        }
        if (translationError) {
          setTranslationErrorFlashMessage(true);
          console.log("Here is what translation error is: ", translationError);
          dispatch(resetTranslationError());
        }
        if (generalError) {
          setGeneralErrorFlashMessage(true);
          console.log("Here is what general error is: ", generalError);
          dispatch(resetGeneralError());
        }

    }
    displayFlashMessage();
  }, [languageError, translationError, lyricsError, generalError, dispatch])

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
        //keep this color
        setBgColor("#794089");
      } else if (LyricsTranslationInView) {
        setBgColor("#8019FF");
      } else if (DanceabilitySearchInView) {
        //keep this color
        setBgColor("#8019FF");
      } else if (categoriesInView) {
        setBgColor("#8700B0");
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
      <div className="Flash-Messages-Container">
        {noLyricsFlashMessage && (<FlashMessage setState={setNoLyricsFlashMessage} message="Unfortunately there are no Lyrics for that song yet."/> )}
        {languageNotFoundFlashMessage && (<FlashMessage setState={setLanguageNotFoundFlashMessage} message="That Language was not found, please try again."/> )}
        {translationErrorFlashMessage && (<FlashMessage setState={setTranslationErrorFlashMessage} message="Sorry, we couldn't get a translation at this moment."/> )}
        {generalErrorFlashMessage && (<FlashMessage setState={setGeneralErrorFlashMessage} message="Uh oh, something went wrong. Please try again."/> )}
      </div>
      {ChooseCategoryDiv}
      {DanceabilitySearchDiv}
      {LanguageSelectDiv}
      {LyricsTranslationDiv}
    </>
  );
}

export default BrowseByDanceability;