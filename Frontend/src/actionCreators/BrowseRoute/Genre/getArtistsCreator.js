import { GET_ARTISTS } from "../../../actionTypes";
import BackendCall from "../../../BackendCall";



////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getArtists(genre) {

  return async function(dispatch) {
    // let albumsError = false;
      const artists = await BackendCall.getArtistByGenre(genre);
      console.log("Here are the artists from getArtistByGenre: ", artists);


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
