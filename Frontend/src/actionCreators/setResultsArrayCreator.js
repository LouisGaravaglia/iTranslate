import {GET_RESULTS, UPDATE_SEARCH_ERROR} from "../actionTypes";
import SpotifyAPI from "../SpotifyAPI";

/**
* Makes a call to the spotify API to get array of music objects
* that best match the searchVal. Then so long as the array returned from
* Spotify API has length, we update the store and set results to that array.
* If the array is empty, we update search error reducer in store which will then
* trigger a flash message saying "nothing found with that input"
* @param {string} searchVal - input value form the search field
*/
export function setResultsArray(searchVal) {

  return async function(dispatch) {
    const results = await SpotifyAPI.requestSearch(searchVal);
    try {

      if (results === "Not Found") {
        dispatch(updateSearchError(true))
      } else {
        dispatch(pushResultsArray(results));
      };
    } catch(e) {
      dispatch(updateSearchError(true));
    };
  };
};

function pushResultsArray(results) {
  return {type: GET_RESULTS, results};
};

function updateSearchError(searchError) {
  return {type: UPDATE_SEARCH_ERROR, searchError}
};