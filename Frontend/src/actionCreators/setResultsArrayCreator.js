import { GET_RESULTS, UPDATE_SEARCH_ERROR } from "../actionTypes";
import SpotifyAPI from "../SpotifyAPI";



////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function setResultsArray(searchVal) {

  return async function(dispatch) {
    const searchError = false;

    const handleTrackSearchSubmit = async (searchVal) => {
      console.log("handleSubmit: ", searchVal);

      const resultsArray = await SpotifyAPI.requestSearch(searchVal);

      if (resultsArray === "Not Found") {
        //FLASH MESSAGE SAYING NO SONGS FOUND WITH THAT SEARCH VALUE
        searchError = true;
        console.log("noting found from Spotify");
        return "";
      } else {
        console.log("resultArray: ", resultsArray);
        return resultsArray;
      }
    }

    const results = await handleTrackSearchSubmit(searchVal);

    dispatch(pushResultsArray(results));
    dispatch(updateGetTranslationErrors(searchError))
  };
}

function pushResultsArray(results) {
  return {type:GET_RESULTS, results};
}

function updateGetTranslationErrors(searchError) {
  return {type: UPDATE_SEARCH_ERROR, searchError}
}
