import React, {useState, useRef, useEffect} from 'react';
import SpotifyAPI from "./SpotifyAPI";
import SearchResult from "./SearchResult";
import SearchBar from "./SearchBar";
import LyricsAPI from "./LyricsAPI";
import IBMWatsonAPI from "./IBMWatsonAPI";
import ArtistAPI from './ArtistAPI';

const Search = () => {
  // const [searchVal, setSearchVal] = useState("")
  const [searchResults, setSearchResults] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [translation, setTranslation] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [languages, setLanguages] = useState("");
  const searchResultsRef = useRef();
  const lyricsTranslationRef = useRef();
  const selectLanguageRef = useRef();
  // console.log("SEARCH RESULTS REF: ", searchResultsRef);
  // console.log("LYRICS RESULTS REF: ", lyricsTranslationRef);

  useEffect(() => {
    async function getLanguages() {
      const res = await IBMWatsonAPI.getLanguages();
      console.log("my languages!!!: ", res);
      setLanguages(res);
    }
    getLanguages();
  }, []);

  // const handleChange = (e) => {
  //   setSearchVal(e.target.value);
  // }

  const handleTrackSearchSubmit = async (searchVal) => {
    // e.preventDefault();
    console.log("handleSubmit: ", searchVal);
    // const resultsArray = await SpotifyAPI.getSeedData(searchVal);
    const resultsArray = await SpotifyAPI.requestSearch(searchVal);
    console.log("resultArray: ", resultsArray);
    setSearchResults(resultsArray);
    // setSearchVal("")
    searchResultsRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }



  const getLyrics = async (artist, track, index) => {

    // const base = searchResults[index];
    // const tData = { spotify_id: base.id, name: base.name, spotify_uri: base.uri, explicit: base.explicit, popularity: base.popularity, preview_url: base.preview_url  };
    // const aData = { spotify_id: base.artists[0].id, name: base.artists[0].name, spotify_uri: base.artists[0].uri };
    // const albumData = { spotify_id: base.album.id, name: base.album.name, release_date: base.album.release_date, spotify_uri: base.album.uri, img_url: base.album.images[1] };
    // const [trackData, artistData] = await SpotifyAPI.getSeedData(tData, aData);
    // const trackId = await ArtistAPI.addTrack(trackData);
    // const artistId = await ArtistAPI.addArtist(artistData);
    // const albumId = await ArtistAPI.addAlbum(albumData);
    setSelectedTrack(track);
    const trackLyrics = await LyricsAPI.getLyrics(artist, track);
    setLyrics(trackLyrics);

    selectLanguageRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  const handleLanguageSearchSubmit = async (searchVal) => {
    const chosenLanguage = languages.filter( l => l.language_name.toLowerCase() === searchVal.toLowerCase() );
    console.log("MY CHOSEN LANGUAGE", chosenLanguage[0].language);

    //I'm going to need to send the getTranslation request and now add the chosen Language along with the trackLyrics

    
    // const translatedLyrics = await IBMWatsonAPI.getTranslation(trackLyrics);
    // console.log("LANGUAGES: ", translatedLyrics);
    // setTranslation(translatedLyrics);

    lyricsTranslationRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  let SearchResultsDiv;
  
  if (searchResults.length) SearchResultsDiv = (
    <div className="Search-Results" ref={searchResultsRef}>
      {searchResults.map( ( r, i ) => <SearchResult key={i} index={i} getLyrics={getLyrics} artist={r.artists[0].name} album={r.album.name} track={r.name} trackId={r.id} artistId={r.artists[0].id} albumId={r.album.id}/>)}
    </div>
  );

  let SelectLanguageDiv;

  if (lyrics) SelectLanguageDiv = (
    <div ref={selectLanguageRef}>
      <SearchBar header="Select which language you'd like your lyrics translated to!" handleSubmit={handleLanguageSearchSubmit}/>
    </div>
  );

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
      {/* <div className="Search-Field">
        <p></p>
        <h1>Find your song!</h1>
        <form onSubmit={handleSubmit}>
        <div className="Search-Input-Container">
            <input
              type="text"
              id="SearchVal"
              name="searchVal"
              value={searchVal}
              onChange={handleChange}
            />
            <button type="submit"><i class="fa fa-search icon"></i></button>
          </div>
        </form>
        <p></p>
      </div> */}

      <SearchBar header="Find your wine!" handleSubmit={handleTrackSearchSubmit}/>

   

      {SearchResultsDiv}
      {SelectLanguageDiv}
      {LyricsTranslationDiv}
   
      
    </div>
  );

};

export default Search;