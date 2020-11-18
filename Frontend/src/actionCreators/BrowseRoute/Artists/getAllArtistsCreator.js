import { GET_ARTISTS } from "../../../actionTypes";
import BackendCall from "../../../BackendCall";



////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getAllArtists() {

  return async function(dispatch) {
    // let albumsError = false;
      const artists = await BackendCall.getArtistsAndArtistIds();
      console.log("My artist/id array: ", artists);
      console.log("An artist name: ", artists[0].name);

    dispatch(addArtists(artists));
    // dispatch(updateArtistErrors(tracksError))
  };
}

function addArtists(artists) {
  return {type:GET_ARTISTS, artists};
}

// function updateArtistErrors(albumsError) {
//   return {type: UPDATE_SEARCH_ERROR, albumsError}
// }
