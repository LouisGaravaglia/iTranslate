import React, {useState, useRef, useEffect, useCallback} from 'react';
//COMPONENT IMPORTS
import SearchBar from "./SearchBar";
import FlashMessage from "./FlashMessage";
import LyricsTranslation from "./LyricsTranslation";
import Tracks from "./Tracks";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetSearchError} from "./actionCreators/handleErrorsCreator";
import {setResultsArray} from "./actionCreators/setResultsArrayCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";

const Search = () => {
  //REDUX STORE
  const languageError = useSelector(store => store.errors.languageError);
  const translationError = useSelector(store => store.errors.translationError);
  const lyricsError = useSelector(store => store.errors.lyricsError);
  const lyrics = useSelector(store => store.lyrics);
  const searchResults = useSelector(store => store.results);
  const searchError = useSelector(store => store.errors.searchError);
  const selectedTrack = useSelector(store => store.selectedTrack);
  const dispatch = useDispatch();
  //STATE FOR FLASH MESSAGES
  const [searchFlashMessage, setSearchFlashMessage] = useState(false);
  const [noLyricsFlashMessage, setNoLyricsFlashMessage] = useState(false);
  const [languageNotFoundFlashMessage, setLanguageNotFoundFlashMessage] = useState(false);
  const [translationErrorFlashMessage, setTranslationErrorFlashMessage] = useState(false);
  //REFS FOR PAGE TRAVERSAL
  const searchResultsRef = useRef();
  const selectLanguageRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    }

  }, []);

  //SCROLL DOWN TO SEARCH RESULTS DIV WHEN RESULTS ARE SET IN STATE
  useEffect(() => {scrollToNextDiv(searchResults, searchResultsRef);}, [searchResults, searchResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

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

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let SearchResultsDiv;
  
  if (searchResults) SearchResultsDiv = (
    <div className="Main-Container" ref={searchResultsRef}>
      <Tracks results={searchResults} typeOfResults={"search-results"} itemsPerPage={1} />
    </div>
  );

  let LyricsAndTranslationDivs;

  if (lyrics) LyricsAndTranslationDivs = (
    <div ref={selectLanguageRef}>
      <LyricsTranslation selectedTrackId={selectedTrack.trackId} />
    </div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className="Search">
      <div className="Flash-Messages-Container">
        {searchFlashMessage && (<FlashMessage setState={setSearchFlashMessage} message="We couldn't find any songs with that Artist or Song name, please try again."/> )}
        {noLyricsFlashMessage && (<FlashMessage setState={setNoLyricsFlashMessage} message="Unfortunately there are no Lyrics for that song yet."/> )}
        {languageNotFoundFlashMessage && (<FlashMessage setState={setLanguageNotFoundFlashMessage} message="That Language was not found, please try again."/> )}
        {translationErrorFlashMessage && (<FlashMessage setState={setTranslationErrorFlashMessage} message="Sorry, we couldn't get a translation at this moment."/> )}
      </div>
      <SearchBar header="Find your song!" handleSubmit={handleTrackSearchSubmit}/>
      {SearchResultsDiv}
      {LyricsAndTranslationDivs}
    </div>
  );

};

export default Search;