import React,  {useState, useRef, useEffect, useCallback} from 'react';
import './App.css';
//API IMPORTS
import BackendCall from './BackendCall';
import SpotifyAPI from "./SpotifyAPI";
import IBMWatsonAPI from './IBMWatsonAPI';
import LyricsAPI from "./LyricsAPI";
//COMPONENT IMPORTS
import Album from "./Album";
import Track from "./Track";
import DisplayLyrics from "./DisplayLyrics";
import SearchBar from "./SearchBar";
import FlashMessage from "./FlashMessage";
import SearchResultList from "./SearchResultList";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "./actionCreators/getTranslationCreator";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetSearchError} from "./actionCreators/handleErrorsCreator";
import {getLyrics} from "./actionCreators/getLyricsCreator";
import {setResultsArray} from "./actionCreators/setResultsArrayCreator";
import {getAlbums} from "./actionCreators/BrowseRoute/Artists/getAlbumsCreator";
import {getTracks} from "./actionCreators/BrowseRoute/Artists/getTracksCreator";


function Browse() {
  // const [albums, setAlbums] = useState([]);
  // const [tracks, setTracks] = useState([]);
  // const [artists, setArtists] = useState([]);
  // const [lyrics, setLyrics] = useState("");
  // const [translation, setTranslation] = useState("");
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [genres, setGenres] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
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
  const searchResults = useSelector(store => store.results);
  const searchError = useSelector(store => store.errors.searchError);
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
        if (searchError) {
          setSearchFlashMessage(true);
          console.log("Here is what search error is: ", searchError);
          dispatch(resetSearchError());
        }

    }
    displayFlashMessage();
  }, [languageError, translationError, lyricsError, searchError])

  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    }

  }, []);

  //SCROLL DOWN TO SEARCH RESULTS DIV WHEN RESULTS ARE SET IN STATE
  useEffect(() => {scrollToNextDiv(albums, albumResultsRef);}, [albums, albumResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(tracks, trackResultsRef);}, [tracks, trackResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(translation, lyricsTranslationRef);}, [translation, lyricsTranslationRef, scrollToNextDiv]);

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleArtistClick = async (artistId) => {
    dispatch(getAlbums(artistId));
    setSelectedArtistId(artistId);
  }

  const handleAlbumClick = async (albumId, index) => {
    setSelectedAlbumId(albumId);
    const base = albums[index];
    setCompleteAlbumData({ spotify_id: base.id, name: base.name, release_date: base.release_date, spotify_uri: base.uri, img_url: base.images[1].url})
    dispatch(getTracks(albumId));
  }

  //IMPORTED FROM SEARCH, NEED TO TURN INTO HANDLE TRACK CLICK FUNCTION
  const handleTrackClick = async (artist, track, index) => {
    const base = tracks[index];
    setSelectedTrackId(base.id);
    //MAKE CALL TO SPOTIFY API TO GET ADDITIONAL TRACK AND ARTIST INFO (GENRE, TEMPO, DANCEABILITY, ETC).
    //THIS ALSO MAKES THE PROCESS OF GETTING INFO FOR DB STREAMLINED SINCE WE ONLY NEED 3 ID'S
    try {
      const [trackData, artistData, albumData] = await SpotifyAPI.getTrackArtistAlbumData(base.id, selectedArtistId, selectedAlbumId);
      dispatch(getLyrics(trackData, artistData, albumData, artist, track));
    } catch(e) {
      const partialTrackData = { spotify_id: base.id, name: base.name, spotify_uri: base.uri, explicit: base.explicit, preview_url: base.preview_url  };
      const partialArtistData = { spotify_id: base.artists[0].id, name: base.artists[0].name, spotify_uri: base.artists[0].uri };
      dispatch(getLyrics(partialTrackData, partialArtistData, completeAlbumData, artist, track));
    }
  }

  const handleLanguageSearchSubmit = async (searchVal) => {
    dispatch(getTranslation(searchVal, languages, selectedTrackId, lyrics));   
  }

  ////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let ArtistResultsDiv;
  
  if (category === "Artists") ArtistResultsDiv = (
      <div ref={artistResultsRef}>
        <SearchResultList key={artists[0].spotify_id} typeOfResults="artists" resultsArray={artists} handleSearch={handleArtistClick} itemsPerPage={16}/>
      </div>
  );

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let AlbumResultsDiv;
  
  if (albums) AlbumResultsDiv = (
    <div ref={albumResultsRef}>
        <SearchResultList key={albums[0].id} typeOfResults="albums" resultsArray={albums} handleSearch={handleAlbumClick} itemsPerPage={3}/>
    </div>
  );

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let TrackResultsDiv;
  
  if (tracks) TrackResultsDiv = (
    <div ref={trackResultsRef}>
      <SearchResultList key={tracks[0].id} typeOfResults="tracks" resultsArray={tracks} handleSearch={handleTrackClick} itemsPerPage={16}/>
      {/* {tracks.map(t => <Track key={t.id} id={t.id} handleTrackClick={handleTrackClick} trackName={t.name} artistName={selectedArtist}/>)} */}
    </div>
  );

  //SELECT LANGUAGE TO TRANSLATE LYRICS TO SEARCH BAR COMPONENT
  let SelectLanguageDiv;

  if (lyrics) SelectLanguageDiv = (
    <div ref={selectLanguageRef}>
      <SearchBar header="Select which language you'd like your lyrics translated to!" handleSubmit={handleLanguageSearchSubmit}/>
    </div>
  );

  //LYRICS AND TRANSLATION HTML
  let LyricsTranslationDiv;
  
  if (translation && translation !== "Could not read language value")  LyricsTranslationDiv = (
      <div className="Browse-Lyrics-Translation" ref={lyricsTranslationRef}>
        <DisplayLyrics lyrics={lyrics} translation={translation}/>
      </div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className="Browse">
      <div className="Flash-Messages-Container">
        {searchFlashMessage && (<FlashMessage duration={5000} setState={setSearchFlashMessage} message="We couldn't find any songs with that Artist or Song name, please try again."/> )}
        {noLyricsFlashMessage && (<FlashMessage duration={5000} setState={setNoLyricsFlashMessage} message="Unfortunately there are no Lyrics for that song yet."/> )}
        {languageNotFoundFlashMessage && (<FlashMessage duration={5000} setState={setLanguageNotFoundFlashMessage} message="That Language was not found, please try again."/> )}
        {translationErrorFlashMessage && (<FlashMessage duration={5000} setState={setTranslationErrorFlashMessage} message="Sorry, we couldn't get a translation at this moment."/> )}
      </div>
      <div className="Browse-Landing">
        <button onClick={() => setCategory("Artists")}>Artists</button>
        <button onClick={() => setCategory("Genre")}>Genre</button>
        <button onClick={() => setCategory("Danceability")}>Danceability</button>
      </div>
      {ArtistResultsDiv}
      {AlbumResultsDiv}
      {TrackResultsDiv}
      {SelectLanguageDiv}
      {LyricsTranslationDiv}
    </div>
  );
}

export default Browse;
