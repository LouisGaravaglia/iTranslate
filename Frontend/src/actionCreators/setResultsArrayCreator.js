import { GET_RESULTS, UPDATE_SEARCH_ERROR } from "../actionTypes";
import SpotifyAPI from "../SpotifyAPI";
import BackendCall from "../BackendCall";


////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function setResultsArray(searchVal) {

  return async function(dispatch) {
    let searchError = false;
    const results = await SpotifyAPI.requestSearch(searchVal);
  console.log("Searchr results = ", results);
    try {

      if (results === "Not Found") {
        //FLASH MESSAGE SAYING NO SONGS FOUND WITH THAT SEARCH VALUE
        searchError = true;
        console.log("noting found from Spotify");
        dispatch(updateSearchErrors(searchError))
      } else {
        // const newSearchResults = [];
        // console.log("here are the results: ", results);

        // //Loop over results array and make new array with consolidated objects
        // for (let track of results) {
        //   let hasLyrics = await BackendCall.checkIfTrackHasLyrics({trackId: track.id});
        //   let inDatabase = await BackendCall.checkIfTrackIsInDB({trackId: track.id});

        //   newSearchResults.push({
        //     trackId: track.id, 
        //     trackName: track.name, 
        //     artistId: track.artists[0].id,
        //     artistName: track.artists[0].name,
        //     albumId: track.album.id,
        //     albumName: track.album.name,
        //     hasLyrics,
        //     inDatabase
        //   });
          
        // };
        // console.log("Here is what the newSearchResults is: ", newSearchResults);
        dispatch(pushResultsArray(results));
      };
    } catch(e) {
      searchError = true;
      console.log("noting found from Spotify");
      dispatch(updateSearchErrors(searchError));
    };
  };
};

function pushResultsArray(results) {
  return {type:GET_RESULTS, results};
}

function updateSearchErrors(searchError) {
  return {type: UPDATE_SEARCH_ERROR, searchError}
}
