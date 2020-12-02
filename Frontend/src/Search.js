import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useSpring, animated} from 'react-spring';
//COMPONENT IMPORTS
import FlashMessage from "./FlashMessage";
import LanguageSelect from "./LanguageSelect";
import LyricsTranslation from "./LyricsTranslation";
import Tracks from "./Tracks";
import SearchLanding from "./SearchLanding";
import ToTopArrow from "./ToTopArrow";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetSearchError} from "./actionCreators/handleErrorsCreator";
import {setResultsArray} from "./actionCreators/setResultsArrayCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
//CUSTOM HOOK IMPORTS
import useOnScreen from "./hooks/useOnScreen";

const Search = () => {
  //STATE FOR ANIMATIONS
  const [bgColor, setBgColor] = useState("#1D4DBE");
  //REDUX STORE
  const translationError = useSelector(store => store.errors.translationError);
  const languageError = useSelector(store => store.errors.languageError);
  const lyricsError = useSelector(store => store.errors.lyricsError);
  const lyrics = useSelector(store => store.lyrics);
  const searchResults = useSelector(store => store.results);
  const searchError = useSelector(store => store.errors.searchError);
  const selectedTrackId = useSelector(store => store.selectedTrack.trackId);
  const translation = useSelector(store => store.translation);
  const dispatch = useDispatch();
  //STATE FOR FLASH MESSAGES
  const [searchFlashMessage, setSearchFlashMessage] = useState(false);
  const [noLyricsFlashMessage, setNoLyricsFlashMessage] = useState(false);
  const [languageNotFoundFlashMessage, setLanguageNotFoundFlashMessage] = useState(false);
  const [translationErrorFlashMessage, setTranslationErrorFlashMessage] = useState(false);
  //REFS FOR PAGE TRAVERSAL
  const searchResultsRef = useRef();
  const selectLanguageRef = useRef();
  const showLyricsTranslationRef = useRef();
  const searchRef = useRef();

////////////////////////////////////////////////////  ANIMATION FOR BACKGROUND COLOR  ////////////////////////////////////////////////////

  const searchBarInView = useOnScreen(searchRef, {threshold: 0.7});
  const searchResultsInView = useOnScreen(searchResultsRef, {threshold: 0.7});
  const selectLanguageInView = useOnScreen(selectLanguageRef, {threshold: 0.7});
  const LyricsTranslationInView = useOnScreen(showLyricsTranslationRef, {threshold: 0.2});

  useEffect(() => {

    const changeInView = (searchResultsInView, searchBarInView, selectLanguageInView, LyricsTranslationInView) => {

      if (searchBarInView) {
        setBgColor("#A800FF");
      } else if (searchResultsInView) {
        setBgColor("#7F00FF");
      } else if (selectLanguageInView) {
        setBgColor("#6000FF");
      } else if (LyricsTranslationInView) {
        setBgColor("#4200FF");
      };
    };
  changeInView(searchResultsInView, searchBarInView, selectLanguageInView, LyricsTranslationInView);
  }, [searchResultsInView, searchBarInView, selectLanguageInView, LyricsTranslationInView]);

  const springProps = useSpring({
    backgroundColor: bgColor,
    config: {duration: 300}
  });

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    };
  }, []);

  //SCROLL DOWN TO SEARCH RESULTS DIV WHEN RESULTS ARE SET IN STATE
  useEffect(() => {scrollToNextDiv(searchResults, searchResultsRef);}, [searchResults, searchResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(translation, showLyricsTranslationRef);}, [translation, showLyricsTranslationRef, scrollToNextDiv]);

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
        if (searchError) {
          setSearchFlashMessage(true);
          dispatch(resetSearchError());
        };
    };
    displayFlashMessage();
  }, [translationError, lyricsError, searchError, languageError, dispatch]);

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const handleTrackSearchSubmit = async (searchVal) => {
    dispatch(setResultsArray(searchVal));
    dispatch(resetStore("lyrics", "translation", "selectedTrack"));
  };

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  const SearchBarDiv = (
    <animated.div style={springProps} ref={searchRef}>
      <SearchLanding handleTrackSearchSubmit={handleTrackSearchSubmit}/>
    </animated.div>
  );

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let SearchResultsDiv;
  
  if (searchResults) SearchResultsDiv = (
    <animated.div style={springProps} ref={searchResultsRef}>
      <Tracks results={searchResults} typeOfResults={"search-results"} itemsPerPage={1} animateIn={true}/>
    </animated.div>
  );

  //DISPLAY LANGUAGE SELECTION SEARCH BAR
  let LanguageSelectDiv;

  if (lyrics) LanguageSelectDiv = (
    <animated.div style={springProps} ref={selectLanguageRef}>
      <LanguageSelect selectedTrackId={selectedTrackId} typeOfSearch="search-language"/>
    </animated.div>
  );

  //DISPLAY LYRICS AND TRANSLATION
  let LyricsTranslationDiv;
  
  if (translation && translation !== "Could not read language value") LyricsTranslationDiv = (
    <animated.div style={springProps}>
      <div className="inViewPlaceholder" ref={showLyricsTranslationRef}></div>
      <ToTopArrow topRef={searchRef} topInView={searchBarInView}/>
      <LyricsTranslation typeOfLyricsTranslation="search"/>
    </animated.div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      <div className="Flash-Messages-Container">
        {searchFlashMessage && (<FlashMessage setState={setSearchFlashMessage} message="We couldn't find any songs with that Artist or Song name, please try again."/> )}
        {noLyricsFlashMessage && (<FlashMessage setState={setNoLyricsFlashMessage} message="Unfortunately there are no Lyrics for that song yet."/> )}
        {languageNotFoundFlashMessage && (<FlashMessage setState={setLanguageNotFoundFlashMessage} message="That Language was not found, please try again."/> )}
        {translationErrorFlashMessage && (<FlashMessage setState={setTranslationErrorFlashMessage} message="Sorry, we couldn't get a translation at this moment."/> )}
      </div>
      {SearchBarDiv}
      {SearchResultsDiv}
      {LanguageSelectDiv}
      {LyricsTranslationDiv}
   </>
  );
};

export default Search;