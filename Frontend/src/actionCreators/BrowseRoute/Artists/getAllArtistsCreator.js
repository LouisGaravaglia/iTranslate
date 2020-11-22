import { GET_ALL_ARTISTS, UPDATE_GENERAL_ERROR } from "../../../actionTypes";
import BackendCall from "../../../BackendCall";

////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getAllArtists() {

  return async function(dispatch) {

    try {
      const artists = await BackendCall.getArtistsAndArtistIds();
      console.log("My artist/id array: ", artists);
      console.log("An artist name: ", artists[0].name);
      dispatch(addArtists(artists));
    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function addArtists(artists) {
  return {type:GET_ALL_ARTISTS, artists};
}

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};
