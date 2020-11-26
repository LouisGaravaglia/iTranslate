import {GET_ALL_ARTISTS, UPDATE_GENERAL_ERROR} from "../../../actionTypes";
import BackendCall from "../../../BackendCall";

/**
* Makes a call to the backend to get an array of all artists and their spotify ids
* that have at least one track that contains lyrics and updates allArtist state.
* This will be displayed in the BrowseByArtists component.
*/
export function getAllArtists() {

  return async function(dispatch) {
    try {
      const artists = await BackendCall.getArtistsAndArtistIds();
      dispatch(addArtists(artists));
    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function addArtists(artists) {
  return {type: GET_ALL_ARTISTS, artists};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};