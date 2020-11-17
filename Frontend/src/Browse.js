import React,  {useState, useRef, useEffect, useContext} from 'react';
import './App.css';
import SpotifyAPI from "./SpotifyAPI";
import IBMWatsonAPI from './IBMWatsonAPI';
import LyricsAPI from "./LyricsAPI";
import Album from "./Album";
import Track from "./Track";
import BackendCall from './BackendCall';
import DisplayLyrics from "./DisplayLyrics";
import SearchBar from "./SearchBar";
import FlashMessage from "./FlashMessage";
import UserContext from "./UserContext";
import SearchResultList from "./SearchResultList";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "./actionCreators/getTranslationCreator";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetSearchError} from "./actionCreators/handleErrorsCreator";
import {getLyrics} from "./actionCreators/getLyricsCreator";
import {setResultsArray} from "./actionCreators/setResultsArrayCreator";


function Browse() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
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
  const translation = useSelector(store => store.translation);
  const languageError = useSelector(store => store.errors.languageError);
  const translationError = useSelector(store => store.errors.translationError);
  const lyricsError = useSelector(store => store.errors.lyricsError);
  const lyrics = useSelector(store => store.lyrics);
  const searchResults = useSelector(store => store.results);
  const searchError = useSelector(store => store.errors.searchError);
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
  //VARIABLES FROM CONTEXT PROVIDER
  const {languages} = useContext(UserContext);

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  useEffect(() => {

    async function seedGenreState() {
      const response = await BackendCall.getGenres();
      console.log("My genre array: ", response[0].genres);
      setGenres(response[0].genres)
    }

    async function seedArtistsState() {
      const artistsAndIds = await BackendCall.getArtistsAndArtistIds();
      console.log("My artist/id array: ", artistsAndIds);
      console.log("An artist name: ", artistsAndIds[0].name);
      setArtists(artistsAndIds)
    }

    seedGenreState();
    seedArtistsState()
  }, [])

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

  //SCROLL DOWN TO ALBUMS WHEN ARTIST HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {
    function scrollToAlbums() {
      if (albums.length) {
        albumResultsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
    scrollToAlbums();
  }, [albums]);

  //SCROLL DOWN TO TRACKS WHEN ALBUM HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {
    function scrollToTracks() {
      if (tracks.length) {
        trackResultsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
    scrollToTracks();
  }, [tracks]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {
    function scrollToLanguageSearch() {
      if (lyrics) {
        selectLanguageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
    scrollToLanguageSearch();
  }, [lyrics]);

//SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {
    function scrollToTranslation() {
      if (selectedLanguage.length) {
        lyricsTranslationRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
    scrollToTranslation();
  }, [selectedLanguage]);

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleArtistClick = async (artistId) => {
    console.log("artistId: ", artistId);
    const albums = await SpotifyAPI.getAlbums(artistId);
    console.log("here are the alubms", albums);    
    setAlbums(albums);
    setSelectedArtistId(artistId);

  }

  const handleAlbumClick = async (albumID, index) => {
    setSelectedAlbumId(albumID);
    const base = albums[index];
    setCompleteAlbumData({ spotify_id: base.id, name: base.name, release_date: base.release_date, spotify_uri: base.uri, img_url: base.images[1].url})
    const tracks = await SpotifyAPI.getTracks(albumID);
    setTracks(tracks);
    console.log("here are the tracks", tracks);
  }

  //OLD HANDLE TRACK CLICK FUNCTION
  // const handleTrackClick = async (trackID, artist, track) => {

  //   // const trackAnalysis = await SpotifyApi.getTrackAnalysis(trackID);
  //   const trackLyrics = await LyricsAPI.getLyrics(artist, track);
  //   setLyrics(trackLyrics);

  // }

  // //IMPORTED FROM SEARCH, NEED TO TURN INTO HANDLE TRACK CLICK FUNCTION
  const handleTrackClick = async (artist, track, index) => {
    const base = tracks[index];
    setSelectedTrackId(base.id);
    //MAKE CALL TO SPOTIFY API TO GET ADDITIONAL TRACK AND ARTIST INFO (GENRE, TEMPO, DANCEABILITY, ETC).
    //THIS ALSO MAKES THE PROCESS OF GETTING INFO FOR DB STREAMLINED SINCE WE ONLY NEED 3 ID'S
    const [trackData, artistData, albumData] = await SpotifyAPI.getTrackArtistAlbumData(base.id, selectedArtistId, selectedAlbumId);

    if (trackData === "Error getting Track Data") {
      const partialTrackData = { spotify_id: base.id, name: base.name, spotify_uri: base.uri, explicit: base.explicit, preview_url: base.preview_url  };
      const partialArtistData = { spotify_id: base.artists[0].id, name: base.artists[0].name, spotify_uri: base.artists[0].uri };
      // getLyrics(partialTrackData, partialArtistData, completeAlbumData, artist, track);
      dispatch(getLyrics(partialTrackData, partialArtistData, completeAlbumData, artist, track));

    } else {
      dispatch(getLyrics(trackData, artistData, albumData, artist, track));

    }

  }

  // const getLyrics = async (trackData, artistData, albumData, artist, track) => {
  //   const response = await BackendCall.addTrackArtistAlbum(trackData, artistData, albumData);

  //   if (response === "Added new track to the DB") {
  //     const APILyrics = await LyricsAPI.getLyrics(artist, track);
  //     console.log("APILyrics = ", APILyrics);

  //     if (APILyrics === "No Lyrics from API") {
  //       //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
  //       setNoLyricsFlashMessage(true);
  //       console.log("No lyrics apparently: ", APILyrics);
  //       await BackendCall.addLyrics({track_id: trackData.spotify_id, lyrics: "No Lyrics"});
  //       return;
  //     } else {
  //       console.log("SET LYRICS IN FIRST CONDTIONAL");
  //       //PASSING AN OBJECT TO STATE SO THAT USE-EFFECT IS TRIGGERED BECAUSE STATE IS FORCED TO UPDATE EVEN IF THE LYRICS ARE THE SAME
  //       setLyrics([APILyrics, {}]);
  //       await BackendCall.addLyrics({track_id: trackData.spotify_id, lyrics: APILyrics});
  //     }

  //   } else {
  //     const databaseLyrics = await BackendCall.getLyrics({track_id: trackData.spotify_id});
  //     console.log("Setting lyrics to be from the DB: ", databaseLyrics);

  //     if (databaseLyrics === "No Lyrics") {
  //       //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
  //       setNoLyricsFlashMessage(true);
  //       console.log("THE Lyrics in the db = ", databaseLyrics);
  //     } else {
  //       console.log("SET LYRICS IN SECOND CONDTIONAL");
  //       setLyrics([databaseLyrics, {}]);
  //     }
  //   }
  // }

  const handleLanguageSearchSubmit = async (searchVal) => {
        dispatch(getTranslation(searchVal, languages, selectedTrackId, lyrics));
    // setMoveToLyricsTranlsation([true]);
    // console.log("HERE IS THE SEARCH VAL IN BROWSE; ", searchVal);
    // try{
    //   //FILTER OVER LANGUAGES IBM CAN TRANSLATE TO AND PULL OUT THE LANGUAGE-CODE OF THE LANGUAGE THE USER WANT'S TO USE
    //   const [{language}] = languages.filter(l => l.language_name.toLowerCase() === searchVal.toLowerCase());
    //   console.log("language is: ", language);
    //   // setSelectedLanguage([language, {}]);
    //   setNewLanguage(language);
      
    //   getTranslation();
    // } catch(e) {
    //   //FLASH MESSAGE SAYING LANGUAGE WAS NOT FOUND
    //   setLanguageNotFoundFlashMessage(true);
    //   console.log("ERROR CHOOSING LANGUAGE");
    // }
  }

  // const getTranslation = async () => {
  //   //CHECKING TO SEE IF WE HAVE THAT SONG WITH THAT TRACK ID AND THE SPECIFIED LANGUAGE IN OUR TRANSLATION TABLE
  //   const response = await BackendCall.getTranslation({track_id: selectedTrackId, selectedLanguage: newLanguage});
  //   console.log("databaseTranslation: ", response);

  //   if (response === "No Translation in DB") {
  //     console.log("HERE IS THE FULL LANGUAGE STATE IN BROWSE: ", newLanguage);
  //     const IBMTranslation = await IBMWatsonAPI.getTranslation(lyrics, newLanguage);

  //     console.log("Translated lyrics: ", IBMTranslation);

  //     if (IBMTranslation === "Error attempting to read source text") {
  //       //FLASH MESSAGE SAYING TRANSLATION WAS NOT FOUND
  //       setTranslationErrorFlashMessage(true);
  //     } else {
  //       setTranslation(IBMTranslation);
  //       await BackendCall.addTranslation({track_id: selectedTrackId, selectedLanguage: newLanguage, translation: IBMTranslation});
  //     }

  //   } else {
  //     console.log("got transltion from DB");
  //     setTranslation(response);
  //   }
  // }

  ////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let ArtistResultsDiv;
  
  if (category === "Artists") ArtistResultsDiv = (
      <div ref={artistResultsRef}>
        <SearchResultList key={artists[0].spotify_id} typeOfResults="artists" resultsArray={artists} handleSearch={handleArtistClick} itemsPerPage={16}/>
      </div>
  );

  // if (category === "Artists") ArtistResultsDiv = (
  //   <div className="Browse-Artists-Container" ref={artistResultsRef}>
  //     <div className="Browse-Artists">
  //       {artists.map(artist => <button onClick={() => handleArtistClick(artist.spotify_id, artist.name)}>{artist.name}</button>)}
  //     </div>
  //   </div>
  // );
  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let AlbumResultsDiv;
  
  if (albums.length) AlbumResultsDiv = (
    <div ref={albumResultsRef}>
        <SearchResultList key={albums[0].id} typeOfResults="albums" resultsArray={albums} handleSearch={handleAlbumClick} itemsPerPage={3}/>
    </div>
  );

  // let AlbumResultsDiv;
  
  // if (albums.length) AlbumResultsDiv = (
  //   <div className="Browse-Albums" ref={albumResultsRef}>
  //       {albums.map(a => <Album className="Album" key={a.id} id={a.id} handleAlbumClick={handleAlbumClick} releaseDate={a.release_date} albumType={a.album_type} name={a.name} image={a.images[1].url}/>)}
  //   </div>
  // );
  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let TrackResultsDiv;
  
  if (tracks.length) TrackResultsDiv = (
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
  
  if (lyrics)  LyricsTranslationDiv = (
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
