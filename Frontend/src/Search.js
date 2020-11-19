import React, {useState, useRef, useEffect, useCallback} from 'react';
//API IMPORTS
import SpotifyAPI from "./SpotifyAPI";
import BackendCall from "./BackendCall";
//COMPONENT IMPORTS
import SearchBar from "./SearchBar";
import FlashMessage from "./FlashMessage";
import SearchResultList from "./SearchResultList";
import LyricsTranslation from "./LyricsTranslation";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "./actionCreators/getTranslationCreator";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetSearchError} from "./actionCreators/handleErrorsCreator";
import {getLyrics} from "./actionCreators/getLyricsFromDBCreator";
import {setResultsArray} from "./actionCreators/setResultsArrayCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {getLyricsFromDB} from "./actionCreators/getLyricsFromDBCreator";
import {findLyricsFromAPI} from "./actionCreators/findLyricsFromAPICreator";


const Search = () => {
  //STATE FOR DATA
  const [selectedTrackId, setSelectedTrackId] = useState([]);
  //REDUX STORE
  const languages = useSelector(store => store.languages);
  const languageError = useSelector(store => store.errors.languageError);
  const translationError = useSelector(store => store.errors.translationError);
  const lyricsError = useSelector(store => store.errors.lyricsError);
  const lyrics = useSelector(store => store.lyrics);
  const searchResults = useSelector(store => store.results);
  const searchError = useSelector(store => store.errors.searchError);
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
    dispatch(resetStore("lyrics", "translation"));

  }

  const handleSearchResultsClick = async (artistName, trackName, index) => {
    const track = searchResults[index];
    setSelectedTrackId(track.trackId);
    dispatch(resetStore("translation"));

     try {
      //MAKE CALL TO SPOTIFY API TO GET ADDITIONAL TRACK AND ARTIST INFO (GENRE, TEMPO, DANCEABILITY, ETC).
      //THIS ALSO MAKES THE PROCESS OF GETTING INFO FOR DB STREAMLINED SINCE WE ONLY NEED 3 ID'S
      if (track.hasLyrics) {
        dispatch(getLyricsFromDB(track.trackId));
      } else {
        if (track.inDatabase) {
          dispatch(findLyricsFromAPI(track.trackId, artistName, trackName));
        } else {
          const [trackData, artistData, albumData] = await SpotifyAPI.getTrackArtistAlbumData(track.trackId, track.artistId, track.albumId);
          const response = await BackendCall.addTrackArtistAlbum(trackData, artistData, albumData);
          dispatch(findLyricsFromAPI(track.trackId, artistName, trackName));
        }
      }
    } catch(e) {  
      //*** NEED TO ADD A "NO LYRICS" FLASH MESSAGE FOR HANDLING A SPOTIFY API ERROR */
    }


  }

    //MAKE CALL TO SPOTIFY API TO GET ADDITIONAL TRACK AND ARTIST INFO (GENRE, TEMPO, DANCEABILITY, ETC).
    //THIS ALSO MAKES THE PROCESS OF GETTING INFO FOR DB STREAMLINED SINCE WE ONLY NEED 3 ID'S
    // try {
    //   const [trackData, artistData, albumData] = await SpotifyAPI.getTrackArtistAlbumData(base.id, base.artists[0].id, base.album.id);
    //   dispatch(getLyrics(trackData, artistData, albumData, artist, track));
    //   console.log("SEARCH; lyrics are: ");
    //   console.log(lyrics);
    // } catch (e) {
    //   //***** WORK ON A FLASH MESSAGE TO SAY COUDN'T GET LYRICS MAYBE SINCE HAD ERROR WITH SPOTIFY */
    //   const partialTrackData = { spotify_id: base.id, name: base.name, spotify_uri: base.uri, explicit: base.explicit, popularity: base.popularity, preview_url: base.preview_url  };
    //   const partialArtistData = { spotify_id: base.artists[0].id, name: base.artists[0].name, spotify_uri: base.artists[0].uri };
    //   const partialAlbumData = { spotify_id: base.album.id, name: base.album.name, release_date: base.album.release_date, spotify_uri: base.album.uri};
    //   dispatch(getLyrics(partialTrackData, partialArtistData, partialAlbumData, artist, track));
    //   console.log("SEARCH; lyrics are: ");
    //   console.log(lyrics);
    // }

  //GET A HOLD OF LANGUAGE CODE FROM INPUT VALUE, THEN GET TRANSLATION BASED OFF OF THAT
  const handleLanguageSearchSubmit = async (searchVal) => {
    dispatch(getTranslation(searchVal, languages, selectedTrackId, lyrics));
    // setMoveToLyricsTranlsation([true]);
  }

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let SearchResultsDiv;
  
  if (searchResults) SearchResultsDiv = (
    <div ref={searchResultsRef}>
      <SearchResultList key={searchResults[0].trackId} typeOfResults="search-results" resultsArray={searchResults} handleSearch={handleSearchResultsClick} itemsPerPage={5}/>
    </div>
  );

  let LyricsAndTranslationDivs;

  if (lyrics) LyricsAndTranslationDivs = (
    <div ref={selectLanguageRef}>
      <LyricsTranslation selectedTrackId={selectedTrackId} />
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