import React, {useState} from 'react';
import SpotifyAPI from "./SpotifyAPI";
import SearchResult from "./SearchResult";
import LyricsAPI from "./LyricsAPI";
import IBMWatsonAPI from "./IBMWatsonAPI";

const Search = () => {
  // const INITIAL_VALUE = {artist:"", track:""}
  const [searchVal, setSearchVal] = useState("")
  const [searchResults, setSearchResults] = useState([]);



  const handleChange = (e) => {
    setSearchVal(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit: ", searchVal);
    const resultsArray = await SpotifyAPI.requestSearch(searchVal);
    console.log("resultArray: ", resultsArray);
    setSearchResults(resultsArray);
    // const lyrics = await LyricsAPI.requestLyrics(artist, track);
    // console.log("These are the lyrics: ", lyrics);
    // const translation = await IBMWatsonAPI.getTranslation(lyrics);
    // console.log("This is the transation: ", translation);
    setSearchVal("")
  }

  return (
    <div className="Search">

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchVal"
          value={searchVal}
          onChange={handleChange}
        />
      {/* <label forHtml="artist">Track</label>
        <input
          type="text"
          id="track"
          name="track"
          value={formData.track}
          onChange={handleChange}
        /> */}
        <button>Submit</button>
      </form>
      <div className="Search-Results">
        {searchResults.map(r => <SearchResult artist={r.artists[0].name} album={r.album.name} track={r.name} trackId={r.id} artistId={r.artists[0].id} albumId={r.album.id}/>)}
      </div>
    </div>
  );
};

export default Search;