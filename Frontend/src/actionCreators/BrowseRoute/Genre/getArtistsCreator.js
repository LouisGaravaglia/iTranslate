import {GET_ARTISTS, UPDATE_GENERAL_ERROR} from "../../../actionTypes";
import BackendCall from "../../../BackendCall";

/**
* Makes a call to the backend to select all artists that have at least
* this genre within their list of genres given by spotify.
* @param {string} genre - selected genre from browse by genre route
*/
export function getArtists(genre) {

  return async function(dispatch) {
    try {
      const artists = await BackendCall.getArtistByGenre(genre);
      dispatch(addArtists(artists));
    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function addArtists(artists) {
  return {type: GET_ARTISTS, artists};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};