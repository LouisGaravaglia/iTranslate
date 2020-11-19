import { GET_TRACKS } from "../../../actionTypes";
import BackendCall from "../../../BackendCall";



////////////////////////////////// GET ALL TRACKS //////////////////////////////////
export function getDanceabilityTracks(lowerLimit, upperLimit) {

  return async function(dispatch) {
    // let albumsError = false;
      const tracks = await BackendCall.getDanceabilityTracks({lowerLimit, upperLimit});
      console.log("All tracks: ", tracks);

    dispatch(addTracks(tracks));
    // dispatch(updateArtistErrors(tracksError))
  };
}

function addTracks(tracks) {
  return {type:GET_TRACKS, tracks};
}

// function updateArtistErrors(albumsError) {
//   return {type: UPDATE_SEARCH_ERROR, albumsError}
// }
