import React,  {useState, useRef, useEffect, useCallback} from 'react';
import {useSpring, animated} from 'react-spring';
import './App.css';
//COMPONENT IMPORTS
import LyricsTranslation from "./LyricsTranslation";
import LanguageSelect from "./LanguageSelect";
import DanceabilitySearch from "./DanceabilitySearch";
import Categories from "./BrowseCategories";
import FlashMessage from "./FlashMessage";
import ToTopArrow from "./ToTopArrow";
//REDUX IMPORTS
import {useSelector, useDispatch} from "react-redux";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetGeneralError} from "./actionCreators/handleErrorsCreator";
//CUSTOM HOOK IMPORTS
import useOnScreen from "./useOnScreen";

function BrowseByDanceability() {
  //STATE FOR ANIMATIONS
  const [bgColor, setBgColor] = useState("#4e1eff");
  //REDUX STORE
  const lyrics = useSelector(store => store.lyrics);
  const tracks = useSelector(store => store.tracks.tracks);
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
          dispatch(resetLyricsError());
        };
        if (languageError) {
          setLanguageNotFoundFlashMessage(true);
          dispatch(resetLanguageError());
        };
        if (translationError) {
          setTranslationErrorFlashMessage(true);
          dispatch(resetTranslationError());
        };
        if (generalError) {
          setGeneralErrorFlashMessage(true);
          dispatch(resetGeneralError());
        };
    };
    displayFlashMessage();
  }, [languageError, translationError, lyricsError, generalError, dispatch]);

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
    };
  }, []);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

  //SCROLL DOWN TO SHOW LYRICS AND TRANSLATION WHEN TRANSLATION HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(translation, showLyricsTranslationRef);}, [translation, showLyricsTranslationRef, scrollToNextDiv]);

////////////////////////////////////////////////////  ANIMATION FOR BACKGROUND COLOR  ////////////////////////////////////////////////////

  const categoriesInView = useOnScreen(categoryRef, {threshold: 0.7});
  const danceabilitySearchInView = useOnScreen(DanceabilitySearchRef, {threshold: 0.7});
  const selectLanguageInView = useOnScreen(selectLanguageRef, {threshold: 0.7});
  const lyricsTranslationInView = useOnScreen(showLyricsTranslationRef, {threshold: 0.7});

  useEffect(() => {
    const changeInView = (selectLanguageInView, lyricsTranslationInView, danceabilitySearchInView, categoriesInView) => {

      if (categoriesInView) {
        setBgColor("#4e1eff");
      } else if (danceabilitySearchInView) {
        setBgColor("#7c75fc");
      } else if (selectLanguageInView) {
        setBgColor("#9eb5fa");
      } else if (lyricsTranslationInView) {
        setBgColor("#c1f7f7");
      };
    };
  changeInView(selectLanguageInView, lyricsTranslationInView, danceabilitySearchInView, categoriesInView);
  }, [selectLanguageInView, lyricsTranslationInView, danceabilitySearchInView, categoriesInView]);

  const springProps = useSpring({
    backgroundColor: bgColor,
    config: {duration: 300}
  });

////////////////////////////////////////////////////  CLICK EVENTS  ////////////////////////////////////////////////////

  const scrollToDanceability = () => {
    DanceabilitySearchRef.current.scrollIntoView({behavior: "smooth"});
  };

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY THE THREE CATEGORIES
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

  //DISPLAY DANCEABILITY SEARCH BAR
  // let DanceabilitySearchDiv;

  // if (tracks) {
  //   DanceabilitySearchDiv = (
  //     <animated.div style={springProps} ref={DanceabilitySearchRef}>
  //       <DanceabilitySearch />
  //     </animated.div>
  //   );
  // } else {
  //   DanceabilitySearchDiv = (
  //     <animated.div style={springProps} ref={DanceabilitySearchRef}>
  //     </animated.div>
  //   );
  // };

  //DISPLAY LANGUAGE SELECTION SEARCH BAR
  let LanguageSelectDiv;

  if (lyrics) LanguageSelectDiv = (
    <animated.div style={springProps} ref={selectLanguageRef}>
      <LanguageSelect selectedTrackId={selectedTrackId} typeOfSearch="danceability-language"/>
    </animated.div>
  );

  //DISPLAY LYRICS AND TRANSLATION
  let LyricsTranslationDiv;
  
  if (translation && translation !== "Could not read language value")  LyricsTranslationDiv = (
    <animated.div style={springProps} >
      <div className="inViewPlaceholder" ref={showLyricsTranslationRef}></div>
      <ToTopArrow topRef={categoryRef} topInView={categoriesInView}/>
      <LyricsTranslation typeOfLyricsTranslation="danceability"/>
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
};

export default BrowseByDanceability;