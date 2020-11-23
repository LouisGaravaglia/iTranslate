import React, {useState, useRef, useEffect} from 'react';
import {Spring} from 'react-spring/renderprops';
import {useSpring, animated} from 'react-spring';

import './App.css';
//COMPONENT IMPORTS
import FlashMessage from "./FlashMessage";
import BrowseByArtists from "./BrowseByArtists";
import BrowseByGenre from "./BrowseByGenre";
import BrowseByDanceability from "./BrowseByDanceability";
import Categories from "./BrowseCategories";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetGeneralError} from "./actionCreators/handleErrorsCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {getAllArtists} from "./actionCreators/BrowseRoute/Artists/getAllArtistsCreator";
import {getGenres} from "./actionCreators/BrowseRoute/Genre/getGenresCreator";

function Browse() {
  //REACT STATE
  const [category, setCategory] = useState("");
  const [bgColor, setBgColor] = useState("#22A833");
  //REDUX STORE
  const dispatch = useDispatch();
  const languageError = useSelector(store => store.errors.languageError);
  const translationError = useSelector(store => store.errors.translationError);
  const lyricsError = useSelector(store => store.errors.lyricsError);
  const generalError = useSelector(store => store.errors.generalError);
  //STATE FOR FLASH MESSAGES
  const [searchFlashMessage, setSearchFlashMessage] = useState(false);
  const [noLyricsFlashMessage, setNoLyricsFlashMessage] = useState(false);
  const [languageNotFoundFlashMessage, setLanguageNotFoundFlashMessage] = useState(false);
  const [translationErrorFlashMessage, setTranslationErrorFlashMessage] = useState(false);
  const [noAlbumsFlashMessage, setNoAlbumsFlashMessage] = useState(false);
  const [generalErrorFlashMessage, setGeneralErrorFlashMessage] = useState(false);
  //REFS FOR PAGE TRAVERSAL
  const artistResultsRef = useRef();
  const genreResultsRef = useRef();
  const danceabilityResultsRef = useRef();
  const categoryRef = useRef();

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
        if (generalError) {
          setGeneralErrorFlashMessage(true);
          console.log("Here is what general error is: ", generalError);
          dispatch(resetGeneralError());
        }

    }
    displayFlashMessage();
  }, [languageError, translationError, lyricsError, generalError, dispatch])

////////////////////////////////////////////////////  ANIMATION HOOKS  ////////////////////////////////////////////////////

  const springProps = useSpring({
    backgroundColor: bgColor,
    config: {duration: 800}
  });


////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

const handleCategoryClick = (category) => {
  setCategory([category, {}]);
  dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "selectedTrack"));
}

const handleNoAlbumsError = () => {
   setNoAlbumsFlashMessage(true);
}

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////


  //DISPLAY BROWSE BY ARTISTS COMPONENTS
  let ChooseCategoryDiv = (
      <animated.div style={springProps} ref={categoryRef}>
               <Categories handleCategoryClick={handleCategoryClick}/>
      </animated.div>
  );

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
    // <Spring
    //   from={{opacity: 0, marginLeft: 2500}}
    //   to={{opacity: 1, marginLeft: 0}}
    //   config={{delay: 300, duration: 300}}
    // >
    // {props => (
    //   <div style={props}>

  
        <div className="Browse">
          <div className="Flash-Messages-Container">
            {searchFlashMessage && (<FlashMessage setState={setSearchFlashMessage} message="We couldn't find any songs with that Artist or Song name, please try again."/> )}
            {noLyricsFlashMessage && (<FlashMessage setState={setNoLyricsFlashMessage} message="Unfortunately there are no Lyrics for that song yet."/> )}
            {languageNotFoundFlashMessage && (<FlashMessage setState={setLanguageNotFoundFlashMessage} message="That Language was not found, please try again."/> )}
            {translationErrorFlashMessage && (<FlashMessage setState={setTranslationErrorFlashMessage} message="Sorry, we couldn't get a translation at this moment."/> )}
            {generalErrorFlashMessage && (<FlashMessage setState={setGeneralErrorFlashMessage} message="Uh oh, something went wrong. Please try again."/> )}
            {/* {noAlbumsFlashMessage && (<FlashMessage setState={setNoAlbumsFlashMessage} message="Sorry, there are no albums for that artist at this time."/> )} */}
          </div>
          {ChooseCategoryDiv}
  
          {BrowseByArtistsDiv}
          {BrowseByGenreDiv}
          {BrowseByDanceabilityDiv}
        </div>

    //   </div>
    // )}
    // </Spring>
  );
};

export default Browse;
