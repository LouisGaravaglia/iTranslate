import {GET_ALBUMS, UPDATE_GENERAL_ERROR} from "../../../actionTypes";
import BackendCall from "../../../BackendCall";

/**
* Makes a call to the backend to get all albums by a particular aritst
* as long as they contain at least one track that has lyrics. Updates albums state.
* @param {string} artistId - spotify id for selected artist
*/
export function getAlbums(artistId) {

  return async function(dispatch) {
    try {
      let albums = await BackendCall.getAlbums({artistId});
      dispatch(addAlbums(albums));
    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function addAlbums(albums) {
  return {type: GET_ALBUMS, albums};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};