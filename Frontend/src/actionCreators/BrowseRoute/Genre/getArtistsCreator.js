import {GET_ARTISTS, UPDATE_GENERAL_ERROR} from "../../../actionTypes";
import BackendCall from "../../../BackendCall";

////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getArtists(genre) {

  return async function(dispatch) {

    try {
      const artists = await BackendCall.getArtistByGenre(genre);
      console.log("Here are the artists from getArtistByGenre: ", artists);
      dispatch(addArtists(artists));
    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function addArtists(artists) {
  return {type:GET_ARTISTS, artists};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};
