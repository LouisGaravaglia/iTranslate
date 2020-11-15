import React,  {useState, useRef, useEffect, useContext} from 'react';
import './App.css';
import SpotifyApi from "./SpotifyAPI";
import IBMWatsonAPI from './IBMWatsonAPI';
import LyricsAPI from "./LyricsAPI";
import Album from "./Album";
import Track from "./Track";
import BackendCall from './BackendCall';
import DisplayLyrics from "./DisplayLyrics";
import SearchBar from "./SearchBar";
import FlashMessage from "./FlashMessage";
import UserContext from "./UserContext";

function Browse() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [translation, setTranslation] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [genres, setGenres] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState([]);
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
  const { languages  } = useContext(UserContext);

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
      if (lyrics.length) {
        selectLanguageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
    scrollToLanguageSearch();
  }, [lyrics, setLyrics]);

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

  const handleArtistClick = async (artistID, artistName) => {
    console.log("artistId: ", artistID);
    const albums = await SpotifyApi.getAlbums(artistID);
    console.log("here are the alubms", albums);    
    setAlbums(albums);
    setSelectedArtist(artistName);

  }

  const handleAlbumClick = async (albumID) => {

    const tracks = await SpotifyApi.getTracks(albumID);
    setTracks(tracks);
    console.log("here are the tracks", tracks);
  }

  const handleTrackClick = async (trackID, artist, track) => {

    // const trackAnalysis = await SpotifyApi.getTrackAnalysis(trackID);
    const trackLyrics = await LyricsAPI.getLyrics(artist, track);
    setLyrics(trackLyrics);
    const translatedLyrics = await IBMWatsonAPI.getTranslation(trackLyrics);
    setTranslation(translatedLyrics);
  }

  const handleLanguageSearchSubmit = async (searchVal) => {

    try{
      //FILTER OVER LANGUAGES IBM CAN TRANSLATE TO AND PULL OUT THE LANGUAGE-CODE OF THE LANGUAGE THE USER WANT'S TO USE
      const [{language}] = languages.filter(l => l.language_name.toLowerCase() === searchVal.toLowerCase());
      console.log("language is: ", language);
      setSelectedLanguage([language, {}]);
      getTranslation();
    } catch(e) {
      //FLASH MESSAGE SAYING LANGUAGE WAS NOT FOUND
      setLanguageNotFoundFlashMessage(true);
      console.log("ERROR CHOOSING LANGUAGE");
    }
  }

  const getTranslation = async () => {
    //CHECKING TO SEE IF WE HAVE THAT SONG WITH THAT TRACK ID AND THE SPECIFIED LANGUAGE IN OUR TRANSLATION TABLE
    const response = await BackendCall.getTranslation({track_id: selectedTrackId, selectedLanguage});
    console.log("databaseTranslation: ", response);

    if (response === "No Translation in DB") {
      const IBMTranslation = await IBMWatsonAPI.getTranslation(lyrics[0], selectedLanguage);
      console.log("Translated lyrics: ", IBMTranslation);

      if (IBMTranslation === "Error attempting to read source text") {
        //FLASH MESSAGE SAYING TRANSLATION WAS NOT FOUND
        setTranslationErrorFlashMessage(true);
      } else {
        setTranslation(IBMTranslation);
        await BackendCall.addTranslation({track_id: selectedTrackId, selectedLanguage, translation: IBMTranslation});
      }

    } else {
      console.log("got transltion from DB");
      setTranslation(response);
    }
  }

  ////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let ArtistResultsDiv;
  
  if (category === "Artists") ArtistResultsDiv = (
    <div className="Browse-Artists" ref={artistResultsRef}>
      {artists.map(artist => <button onClick={() => handleArtistClick(artist.spotify_id, artist.name)}>{artist.name}</button>)}
    </div>
  );

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let AlbumResultsDiv;
  
  if (albums.length) AlbumResultsDiv = (
    <div className="Browse-Albums" ref={albumResultsRef}>
      {albums.map(a => <Album className="Album" key={a.id} id={a.id} handleAlbumClick={handleAlbumClick} releaseDate={a.release_date} albumType={a.album_type} name={a.name} image={a.images[1].url}/>)}
    </div>
  );

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let TrackResultsDiv;
  
  if (tracks.length) TrackResultsDiv = (
    <div className="Browse-Tracks" ref={trackResultsRef}>
      {tracks.map(t => <Track key={t.id} id={t.id} handleTrackClick={handleTrackClick} trackName={t.name} artistName={selectedArtist}/>)}
    </div>
  );

  //SELECT LANGUAGE TO TRANSLATE LYRICS TO SEARCH BAR COMPONENT
  let SelectLanguageDiv;

  if (lyrics.length) SelectLanguageDiv = (
    <div ref={selectLanguageRef}>
      <SearchBar header="Select which language you'd like your lyrics translated to!" handleSubmit={handleLanguageSearchSubmit}/>
    </div>
  );

  //LYRICS AND TRANSLATION HTML
  let LyricsTranslationDiv;
  
  if (selectedLanguage.length)  LyricsTranslationDiv = (
      <div className="Browse-Lyrics-Translation" ref={lyricsTranslationRef}>
        <DisplayLyrics lyrics={lyrics[0]} translation={translation}/>
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
