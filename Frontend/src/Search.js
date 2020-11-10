import React, {useState} from 'react';
import SpotifyAPI from "./SpotifyAPI";
import SearchResult from "./SearchResult";
import LyricsAPI from "./LyricsAPI";
import IBMWatsonAPI from "./IBMWatsonAPI";

const Search = () => {
  const [searchVal, setSearchVal] = useState("")
  const [searchResults, setSearchResults] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [translation, setTranslation] = useState("");


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
  }

  const getLyrics = async (artist, track) => {
    const trackLyrics = await LyricsAPI.getLyrics(artist, track);
    setLyrics(trackLyrics);
    const translatedLyrics = await IBMWatsonAPI.getTranslation(trackLyrics);
    setTranslation(translatedLyrics);
  }

  return (
    <div className="Search">
      <div className="Search-Field">
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
      </div>
      <div className="Search-Results">
        {searchResults.map(r => <SearchResult getLyrics={getLyrics} artist={r.artists[0].name} album={r.album.name} track={r.name} trackId={r.id} artistId={r.artists[0].id} albumId={r.album.id}/>)}
      </div>
           <div className="Browse-Lyrics-Translation">
        <div className="Browse-Lyrics-Container">
          <p className="Browse-Lyrics">ORIGINAL LYRICS</p>
          <p className="Browse-Lyrics">{lyrics}</p>
        </div>
        <div className="Browse-Translation-Container">
          <p className="Browse-Translation">TRANSLATED LYRICS</p>
          <p className="Browse-Translation">{translation}</p>
        </div>
      </div>
    </div>
  );
};

export default Search;