import React, {useState, useRef} from 'react';
import SpotifyAPI from "./SpotifyAPI";
import SearchResult from "./SearchResult";
import LyricsAPI from "./LyricsAPI";
import IBMWatsonAPI from "./IBMWatsonAPI";

const Search = () => {
  const [searchVal, setSearchVal] = useState("")
  const [searchResults, setSearchResults] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [translation, setTranslation] = useState("");
  const searchResultsRef = useRef();
  const lyricsTranslationRef = useRef();
  console.log("SEARCH RESULTS REF: ", searchResultsRef);
  console.log("LYRICS RESULTS REF: ", lyricsTranslationRef);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit: ", searchVal);
    const resultsArray = await SpotifyAPI.requestSearch(searchVal);
    console.log("resultArray: ", resultsArray);
    setSearchResults(resultsArray);
    setSearchVal("")
    searchResultsRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  const getLyrics = async (artist, track) => {
    lyricsTranslationRef.current.scrollIntoView({
      behavior: "smooth",
    });
    const trackLyrics = await LyricsAPI.getLyrics(artist, track);
    setLyrics(trackLyrics);
    const translatedLyrics = await IBMWatsonAPI.getTranslation(trackLyrics);
    setTranslation(translatedLyrics);

  }

  const SearchResultsDiv = (
       <div className="Search-Results" ref={searchResultsRef}>
        {searchResults.map(r => <SearchResult getLyrics={getLyrics} artist={r.artists[0].name} album={r.album.name} track={r.name} trackId={r.id} artistId={r.artists[0].id} albumId={r.album.id}/>)}
      </div>
  )

  const LyricsTranslationDiv = (
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
  )

  return (
    <div className="Search">
      <div className="Search-Field">
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
      </div>

      <div className="Search-Results" ref={searchResultsRef}>
        {searchResults[0] ? searchResults.map(r => <SearchResult getLyrics={getLyrics} artist={r.artists[0].name} album={r.album.name} track={r.name} trackId={r.id} artistId={r.artists[0].id} albumId={r.album.id}/>) : <p>Standing by for your search!</p>}
      </div>

      {/* {searchResults[0] ? SearchResultsDiv : ""}
      {lyrics !== "" ? LyricsTranslationDiv : ""} */}
      
      
    </div>
  );
};

export default Search;