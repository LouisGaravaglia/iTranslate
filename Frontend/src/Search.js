import React, {useState, useRef, useEffect} from 'react';
import SpotifyAPI from "./SpotifyAPI";
import SearchResult from "./SearchResult";
import SearchBar from "./SearchBar";
import LyricsAPI from "./LyricsAPI";
import IBMWatsonAPI from "./IBMWatsonAPI";
import ArtistAPI from './ArtistAPI';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [translation, setTranslation] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [languages, setLanguages] = useState("");
  const searchResultsRef = useRef();
  const lyricsTranslationRef = useRef();
  const selectLanguageRef = useRef();

  //GET AVAILABLE LANGUAGES TO TRANSLATE LYRICS TO FROM IBM API
  useEffect(() => {
    async function getLanguages() {
      const res = await IBMWatsonAPI.getLanguages();
      console.log("my languages!!!: ", res);
      setLanguages(res);
    }
    getLanguages();
  }, []);

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
      if (selectedTrack) {
        selectLanguageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
    scrollToLanguageSearch();
  }, [selectedTrack, setSelectedTrack]);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {
    function scrollToTranslation() {
      if (selectedLanguage) {
        lyricsTranslationRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
    scrollToTranslation();
  }, [selectedLanguage]);

  const handleTrackSearchSubmit = async (searchVal) => {
    // e.preventDefault();
    console.log("handleSubmit: ", searchVal);
    // const resultsArray = await SpotifyAPI.getSeedData(searchVal);
    const resultsArray = await SpotifyAPI.requestSearch(searchVal);
    console.log("resultArray: ", resultsArray);
    setSearchResults(resultsArray);
  }

  const getLyrics = async (artist, track, index) => {

    const base = searchResults[index];
    const tData = { spotify_id: base.id, name: base.name, spotify_uri: base.uri, explicit: base.explicit, popularity: base.popularity.toString(), preview_url: base.preview_url  };
    const aData = { spotify_id: base.artists[0].id, name: base.artists[0].name, spotify_uri: base.artists[0].uri };
    const albumData = { spotify_id: base.album.id, name: base.album.name, release_date: base.album.release_date, spotify_uri: base.album.uri, img_url: base.album.images[1] };
    const [trackData, artistData] = await SpotifyAPI.getSeedData(tData, aData);
    const trackId = await ArtistAPI.addTrack(trackData);
    const artistId = await ArtistAPI.addArtist(artistData);
    const albumId = await ArtistAPI.addAlbum(albumData);

    //PASSING AN OBJECT TO STATE SO THAT USE-EFFECT IS TRIGGERED BECAUSE STATE IS FORCED TO UPDATE EVEN IF THE TRACK IS SAME
    // setSelectedTrack([track, {}]);
    // const trackLyrics = await LyricsAPI.getLyrics(artist, track);
    // setLyrics(trackLyrics);
  }

  const handleLanguageSearchSubmit = async (searchVal) => {
    //FILTER OVER LANGUAGES IBM CAN TRANSLATE TO AND PULL OUT LANGUAGE CODE OF THE LANGUAGE USER WANT'S TO USE
    const [ { language } ] = languages.filter( l => l.language_name.toLowerCase() === searchVal.toLowerCase() );
    setSelectedLanguage(language);
    const translatedLyrics = await IBMWatsonAPI.getTranslation(lyrics, language);
    console.log("Translated lyrics: ", translatedLyrics);
    setTranslation(translatedLyrics);
  }

  //DISPLAY SEARCH RESULTS FROM SPOTIFY API COMPONENT
  let SearchResultsDiv;
  
  if (searchResults.length) SearchResultsDiv = (
    <div className="Search-Results" ref={searchResultsRef}>
      {searchResults.map( ( r, i ) => <SearchResult key={i} index={i} getLyrics={getLyrics} artist={r.artists[0].name} album={r.album.name} track={r.name} trackId={r.id} artistId={r.artists[0].id} albumId={r.album.id}/>)}
    </div>
  );

  //SELECT LANGUAGE TO TRANSLATE LYRICS TO SEARCH BAR COMPONENT
  let SelectLanguageDiv;

  if (selectedTrack.length) SelectLanguageDiv = (
    <div ref={selectLanguageRef}>
      <SearchBar header="Select which language you'd like your lyrics translated to!" handleSubmit={handleLanguageSearchSubmit}/>
    </div>
  );

  //LYRICS AND TRANSLATION HTML
  let LyricsTranslationDiv;
  
  if (selectedLanguage)  LyricsTranslationDiv = (
      <div className="Browse-Lyrics-Translation" ref={lyricsTranslationRef}>
        <div className="Browse-Lyrics-Container">
          <p className="Browse-Lyrics">ORIGINAL LYRICS</p>
          <p className="Browse-Lyrics">{lyrics}</p>
        </div>
        <div className="Browse-Translation-Container">
          <p className="Browse-Translation">TRANSLATED LYRICS</p>
          <p className="Browse-Translation">{translation}</p>
        </div>
      </div>
  );

  return (
    <div className="Search">
      <SearchBar header="Find your song!" handleSubmit={handleTrackSearchSubmit}/>
      {SearchResultsDiv}
      {SelectLanguageDiv}
      {LyricsTranslationDiv}
    </div>
  );

};

export default Search;