import React,  {useState, useRef, useEffect, useCallback} from 'react';
import './App.css';
//API IMPORTS
import SpotifyAPI from "./SpotifyAPI";
//COMPONENT IMPORTS
import DisplayLyrics from "./DisplayLyrics";
import SearchBar from "./SearchBar";
import FlashMessage from "./FlashMessage";
import SearchResultList from "./SearchResultList";
import BrowseByArtists from "./BrowseByArtists";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "./actionCreators/getTranslationCreator";
import {resetLanguageError, resetTranslationError, resetLyricsError} from "./actionCreators/handleErrorsCreator";
import {getLyrics} from "./actionCreators/getLyricsCreator";
import {getAlbums} from "./actionCreators/BrowseRoute/Artists/getAlbumsCreator";
import {getTracks} from "./actionCreators/BrowseRoute/Artists/getTracksCreator";

function Browse() {
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState([]);
  const [completeAlbumData, setCompleteAlbumData] = useState({});
  //REDUX STORE
  const dispatch = useDispatch();
  const languages = useSelector(store => store.languages);
  const translation = useSelector(store => store.translation);
  const languageError = useSelector(store => store.errors.languageError);
  const translationError = useSelector(store => store.errors.translationError);
  const lyricsError = useSelector(store => store.errors.lyricsError);
  const lyrics = useSelector(store => store.lyrics);
  const artists = useSelector(store => store.artists);
  const albums = useSelector(store => store.albums);
  const tracks = useSelector(store => store.tracks);
  //STATE FOR FLASH MESSAGES
  const [searchFlashMessage, setSearchFlashMessage] = useState(false);
  const [noLyricsFlashMessage, setNoLyricsFlashMessage] = useState(false);
  const [languageNotFoundFlashMessage, setLanguageNotFoundFlashMessage] = useState(false);
  const [translationErrorFlashMessage, setTranslationErrorFlashMessage] = useState(false);
  //REFS FOR PAGE TRAVERSAL
  const lyricsTranslationRef = useRef();
  const artistResultsRef = useRef();
  const genreResultsRef = useRef();
  const danceabilityDivRef = useRef();
  const albumResultsRef = useRef();
  const selectLanguageRef = useRef();
  const trackResultsRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //SCROLL DOWN TO CATEGORY DIV WHEN USER SELECTS A CATEGORY
  useEffect(() => {

    function scrollToCategory() {

      if (category === "Artists") {
        artistResultsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      } else if (category === "Genre") {
        genreResultsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      } else if (category === "Danceability") {
         danceabilityDivRef.current.scrollIntoView({
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
  }, [languageError, translationError, lyricsError])

  ////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY BROWSE BY ARTISTS COMPONENTS
  let BrowseByArtistsDiv;

  if (category === "Artists") BrowseByArtistsDiv = (
      <div ref={artistResultsRef}>
        <BrowseByArtists />
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
      </div>
      <div className="Browse-Landing">
        <button onClick={() => setCategory("Artists")}>Artists</button>
        <button onClick={() => setCategory("Genre")}>Genre</button>
        <button onClick={() => setCategory("Danceability")}>Danceability</button>
      </div>
      {BrowseByArtistsDiv}
    </div>
  );
}

export default Browse;
