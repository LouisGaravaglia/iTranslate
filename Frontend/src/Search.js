import React, {useState, useRef, useEffect, useContext} from 'react';
import SpotifyAPI from "./SpotifyAPI";
import SearchResult from "./SearchResult";
import SearchBar from "./SearchBar";
import DisplayLyrics from "./DisplayLyrics";
import FlashMessage from "./FlashMessage";
import LyricsAPI from "./LyricsAPI";
import IBMWatsonAPI from "./IBMWatsonAPI";
import BackendCall from './BackendCall';
import UserContext from "./UserContext";

const Search = () => {
  //STATE FOR DATA
  const [searchResults, setSearchResults] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [translation, setTranslation] = useState("");
  //STATE FOR FLASH MESSAGES
  const [searchFlashMessage, setSearchFlashMessage] = useState(false);
  const [noLyricsFlashMessage, setNoLyricsFlashMessage] = useState(false);
  const [languageNotFoundFlashMessage, setLanguageNotFoundFlashMessage] = useState(false);
  const [translationErrorFlashMessage, setTranslationErrorFlashMessage] = useState(false);
  //REFS FOR PAGE TRAVERSAL
  const searchResultsRef = useRef();
  const selectLanguageRef = useRef();
  const lyricsTranslationRef = useRef();
  //VARIABLES FROM CONTEXT PROVIDER
  const { languages } = useContext(UserContext);


////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //SCROLL DOWN TO SEARCH RESULTS DIV WHEN RESULTS ARE SET IN STATE
  useEffect(() => {
    function scrollToSearchResults() {
      if (searchResults.length) {
        searchResultsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
    scrollToSearchResults();
  }, [searchResults]);

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

  const handleTrackSearchSubmit = async (searchVal) => {
    console.log("handleSubmit: ", searchVal);
    //TESTING
    // const newReleases = await SpotifyAPI.getNewAlbums();
    // const artistsAndIds = await BackendCall.getArtistsAndArtistIds();
    // console.log("My artist/id array: ", artistsAndIds);
    // const genres = await BackendCall.getGenres();
    // console.log("My genre array: ", genres);
    //TESTING
    const resultsArray = await SpotifyAPI.requestSearch(searchVal);

    if (resultsArray === "Not Found") {
      //FLASH MESSAGE SAYING NO SONGS FOUND WITH THAT SEARCH VALUE
      setSearchFlashMessage(true);
      console.log("noting found from Spotify");
    } else {
      console.log("resultArray: ", resultsArray);
      setSearchResults(resultsArray);
    }
  }

  const handleSearchResultsClick = async (artist, track, index) => {
    const base = searchResults[index];
    setSelectedTrackId(base.id);
    //CREATE OBJECTS FOR TRACK, ARTIST, AND ALBUM INFO
    const partialTrackData = { spotify_id: base.id, name: base.name, spotify_uri: base.uri, explicit: base.explicit, popularity: base.popularity, preview_url: base.preview_url  };
    const partialArtistData = { spotify_id: base.artists[0].id, name: base.artists[0].name, spotify_uri: base.artists[0].uri };
    const completeAlbum = { spotify_id: base.album.id, name: base.album.name, release_date: base.album.release_date, spotify_uri: base.album.uri, img_url: base.album.images[1] };
    //MAKE SECOND CALL TO SPOTIFY API TO GET ADDITIONAL TRACK AND ARTIST INFO (GENRE, TEMPO, DANCEABILITY)
    const [completeTrackData, completeArtistData] = await SpotifyAPI.getSongArtistAnalysis(partialTrackData, partialArtistData);

    if (completeTrackData === "Error getting Track Data") {
      getLyrics(partialTrackData, partialArtistData, completeAlbum, artist, track);
    } else {
      getLyrics(completeTrackData, completeArtistData, completeAlbum, artist, track);
    }

  }

  const getLyrics = async (trackData, artistData, albumData, artist, track) => {
    const response = await BackendCall.addTrackArtistAlbum(trackData, artistData, albumData);

    if (response === "Added new track to the DB") {
      const APILyrics = await LyricsAPI.getLyrics(artist, track);
      console.log("APILyrics = ", APILyrics);

      if (APILyrics === "No Lyrics from API") {
        //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
        setNoLyricsFlashMessage(true);
        console.log("No lyrics apparently: ", APILyrics);
        await BackendCall.addLyrics({track_id: trackData.spotify_id, lyrics: "No Lyrics"});
        return;
      } else {
        console.log("SET LYRICS IN FIRST CONDTIONAL");
        //PASSING AN OBJECT TO STATE SO THAT USE-EFFECT IS TRIGGERED BECAUSE STATE IS FORCED TO UPDATE EVEN IF THE LYRICS ARE THE SAME
        setLyrics([APILyrics, {}]);
        await BackendCall.addLyrics({track_id: trackData.spotify_id, lyrics: APILyrics});
      }

    } else {
      const databaseLyrics = await BackendCall.getLyrics({track_id: trackData.spotify_id});
      console.log("Setting lyrics to be from the DB: ", databaseLyrics);

      if (databaseLyrics === "No Lyrics") {
        //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
        setNoLyricsFlashMessage(true);
        console.log("THE Lyrics in the db = ", databaseLyrics);
      } else {
        console.log("SET LYRICS IN SECOND CONDTIONAL");
        setLyrics([databaseLyrics, {}]);
      }
    }
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
  let SearchResultsDiv;
  
  if (searchResults.length) SearchResultsDiv = (
    <div className="Search-Results" ref={searchResultsRef}>
      {searchResults.map((r, i) => <SearchResult key={i} index={i} getLyrics={handleSearchResultsClick} artist={r.artists[0].name} album={r.album.name} track={r.name} trackId={r.id} artistId={r.artists[0].id} albumId={r.album.id}/>)}
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
    <div className="Search">
      <div className="Flash-Messages-Container">
        {searchFlashMessage && (<FlashMessage duration={5000} setState={setSearchFlashMessage} message="We couldn't find any songs with that Artist or Song name, please try again."/> )}
        {noLyricsFlashMessage && (<FlashMessage duration={5000} setState={setNoLyricsFlashMessage} message="Unfortunately there are no Lyrics for that song yet."/> )}
        {languageNotFoundFlashMessage && (<FlashMessage duration={5000} setState={setLanguageNotFoundFlashMessage} message="That Language was not found, please try again."/> )}
        {translationErrorFlashMessage && (<FlashMessage duration={5000} setState={setTranslationErrorFlashMessage} message="Sorry, we couldn't get a translation at this moment."/> )}
      </div>
      <SearchBar header="Find your song!" handleSubmit={handleTrackSearchSubmit}/>
      {SearchResultsDiv}
      {SelectLanguageDiv}
      {LyricsTranslationDiv}
    </div>
  );

};

export default Search;