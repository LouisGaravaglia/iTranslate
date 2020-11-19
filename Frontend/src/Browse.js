import React,  {useState, useRef, useEffect} from 'react';
import './App.css';
//COMPONENT IMPORTS
import FlashMessage from "./FlashMessage";
import BrowseByArtists from "./BrowseByArtists";
import BrowseByGenre from "./BrowseByGenre";
import BrowseByDanceability from "./BrowseByDanceability";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {resetLanguageError, resetTranslationError, resetLyricsError} from "./actionCreators/handleErrorsCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {getAllArtists} from "./actionCreators/BrowseRoute/Artists/getAllArtistsCreator";
import {getGenres} from "./actionCreators/BrowseRoute/Genre/getGenresCreator";


function Browse() {
  //REACT STATE
  const [category, setCategory] = useState("");
  //REDUX STORE
  const dispatch = useDispatch();
  const languageError = useSelector(store => store.errors.languageError);
  const translationError = useSelector(store => store.errors.translationError);
  const lyricsError = useSelector(store => store.errors.lyricsError);
  //STATE FOR FLASH MESSAGES
  const [searchFlashMessage, setSearchFlashMessage] = useState(false);
  const [noLyricsFlashMessage, setNoLyricsFlashMessage] = useState(false);
  const [languageNotFoundFlashMessage, setLanguageNotFoundFlashMessage] = useState(false);
  const [translationErrorFlashMessage, setTranslationErrorFlashMessage] = useState(false);
  const [noAlbumsFlashMessage, setNoAlbumsFlashMessage] = useState(false);
  //REFS FOR PAGE TRAVERSAL
  const artistResultsRef = useRef();
  const genreResultsRef = useRef();
  const danceabilityResultsRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  useEffect(() => {

    async function getSeedData() {
      //GET ALL ARTISTS IN DB AND STORE THEM FOR THE BROWSE BY ARTISTS COMPONENT
      dispatch(getAllArtists());
      //GET ALL GENRES IN DB AND STORE THEM FOR THE BROWSE BY GENRE COMPONENT
      dispatch(getGenres());
    }

    getSeedData();
  }, [dispatch]);

  //SCROLL DOWN TO CATEGORY DIV WHEN USER SELECTS A CATEGORY
  useEffect(() => {

    function scrollToCategory() {

      if (category[0] === "Artists") {
        artistResultsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      } else if (category[0] === "Genre") {
        genreResultsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      } else if (category[0] === "Danceability") {
         danceabilityResultsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }

    }
    scrollToCategory();
  }, [category, setCategory]);

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

    }
    displayFlashMessage();
  }, [languageError, translationError, lyricsError, dispatch])

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

const handleCategoryClick = (category) => {
  setCategory([category, {}]);
  dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation"));
}

const handleNoAlbumsError = () => {
   setNoAlbumsFlashMessage(true);
}

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY BROWSE BY ARTISTS COMPONENTS
  let BrowseByArtistsDiv;

  if (category[0] === "Artists") BrowseByArtistsDiv = (
      <div ref={artistResultsRef}>
        <BrowseByArtists handleNoAlbumsError={() => handleNoAlbumsError()} />
      </div>
  );

  //DISPLAY BROWSE BY GENRE COMPONENTS
  let BrowseByGenreDiv;

  if (category[0] === "Genre") BrowseByGenreDiv = (
      <div ref={genreResultsRef}>
        <BrowseByGenre />
      </div>
  );

  //DISPLAY BROWSE BY DANCEABILITY COMPONENTS
  let BrowseByDanceabilityDiv;

  if (category[0] === "Danceability") BrowseByDanceabilityDiv = (
      <div ref={danceabilityResultsRef}>
        <BrowseByDanceability />
      </div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className="Browse">
      <div className="Flash-Messages-Container">
        {searchFlashMessage && (<FlashMessage setState={setSearchFlashMessage} message="We couldn't find any songs with that Artist or Song name, please try again."/> )}
        {noLyricsFlashMessage && (<FlashMessage setState={setNoLyricsFlashMessage} message="Unfortunately there are no Lyrics for that song yet."/> )}
        {languageNotFoundFlashMessage && (<FlashMessage setState={setLanguageNotFoundFlashMessage} message="That Language was not found, please try again."/> )}
        {translationErrorFlashMessage && (<FlashMessage setState={setTranslationErrorFlashMessage} message="Sorry, we couldn't get a translation at this moment."/> )}
        {noAlbumsFlashMessage && (<FlashMessage setState={setNoAlbumsFlashMessage} message="Sorry, there are no albums for that artist at this time."/> )}
      </div>
      <div className="Browse-Landing">
        <button onClick={() => handleCategoryClick("Artists")}>Artists</button>
        <button onClick={() => handleCategoryClick("Genre")}>Genre</button>
        <button onClick={() => handleCategoryClick("Danceability")}>Danceability</button>
      </div>
      {BrowseByArtistsDiv}
      {BrowseByGenreDiv}
      {BrowseByDanceabilityDiv}
    </div>
  );
}

export default Browse;
