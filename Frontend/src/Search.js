import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useSpring, animated} from 'react-spring';
//COMPONENT IMPORTS
import SearchBar from "./SearchBar";
import FlashMessage from "./FlashMessage";
import LanguageSelect from "./LanguageSelect";
import LyricsTranslation from "./LyricsTranslation";
import Tracks from "./Tracks";
import SearchLanding from "./SearchLanding";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetSearchError} from "./actionCreators/handleErrorsCreator";
import {setResultsArray} from "./actionCreators/setResultsArrayCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
import useOnScreen from "./useOnScreen";

const Search = () => {
  //STATE FOR ANIMATIONS
  const [bgColor, setBgColor] = useState("#ABA800");
  //REDUX STORE
  const languageError = useSelector(store => store.errors.languageError);
  const translationError = useSelector(store => store.errors.translationError);
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
        setBgColor("#ABA800");
      } else if (searchResultsInView) {
        setBgColor("#8019FF");
      } else if (selectLanguageInView) {
        setBgColor("#AB5D00");
      } else if (LyricsTranslationInView) {
        setBgColor("#008FD1");
      }
    };
  changeInView(searchResultsInView, searchBarInView, selectLanguageInView, LyricsTranslationInView);
  }, [searchResultsInView, searchBarInView, selectLanguageInView, LyricsTranslationInView]);

  const springProps = useSpring({
    backgroundColor: bgColor,
    config: {duration: 900}
  });

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref, divId) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    }

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
          console.log("There is a lyrics error");
          dispatch(resetLyricsError());
        }
        if (languageError) {
          setLanguageNotFoundFlashMessage(true);
          console.log("There is a language error");
          dispatch(resetLanguageError());
        }
        if (translationError) {
          setTranslationErrorFlashMessage(true);
          console.log("Here is what translation error is: ", translationError);
          dispatch(resetTranslationError());
        }
        if (searchError) {
          setSearchFlashMessage(true);
          console.log("Here is what search error is: ", searchError);
          dispatch(resetSearchError());
        }

    }
    displayFlashMessage();
  }, [languageError, translationError, lyricsError, searchError, dispatch])

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleTrackSearchSubmit = async (searchVal) => {
    dispatch(setResultsArray(searchVal));
    dispatch(resetStore("lyrics", "translation, selectedTrack"));

  }

  // const handleBgColorChange = (divId) => {
  //   setBgColor(colorOptions[divId]);
  // }

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let SearchBarDiv;
  
  SearchBarDiv = (
    
    <animated.div style={springProps} ref={searchRef}>

            <SearchLanding handleTrackSearchSubmit={handleTrackSearchSubmit}/>
    </animated.div>
  );

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let SearchResultsDiv;
  
  if (searchResults) SearchResultsDiv = (
        <animated.div style={springProps}  className="Main-Container" ref={searchResultsRef}>
      <Tracks results={searchResults} typeOfResults={"search-results"} itemsPerPage={1} />
    </animated.div>
  
  );

  //DISPLAY LANGUAGE SELECTION SEARCH BAR
  let LanguageSelectDiv;

  if (lyrics) LanguageSelectDiv = (

    <animated.div style={springProps}  ref={selectLanguageRef}>
      <LanguageSelect selectedTrackId={selectedTrackId}/>
    </animated.div>

  );

  //DISPLAY LYRICS AND TRANSLATION
  let LyricsTranslationDiv;
  
  if (translation && translation !== "Could not read language value")  LyricsTranslationDiv = (
    <animated.div style={springProps}  ref={showLyricsTranslationRef}>
      <LyricsTranslation  />
    </animated.div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (

<>

  {/* <div className="Search-Home-Container"> */}

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
         

 {/* </div> */}
   </>    


  );
};

export default Search;