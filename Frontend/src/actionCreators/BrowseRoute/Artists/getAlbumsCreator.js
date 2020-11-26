import { GET_ALBUMS, UPDATE_GENERAL_ERROR } from "../../../actionTypes";
import BackendCall from "../../../BackendCall";

////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getAlbums(artistId) {

  return async function(dispatch) {

    try { 
      let albums = await BackendCall.getAlbums({artistId});
      console.log("here are the alubms", albums); 
      dispatch(addAlbums(albums));
    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function addAlbums(albums) {
  return {type:GET_ALBUMS, albums};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};