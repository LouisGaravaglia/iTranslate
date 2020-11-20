import { GET_TRACKS } from "../../../actionTypes";
import BackendCall from "../../../BackendCall";



////////////////////////////////// GET ALL TRACKS //////////////////////////////////
export function getDanceabilityTracks(lowerLimit, upperLimit) {

  return async function(dispatch) {
    console.log("fetching danceability: ", lowerLimit, upperLimit);
    // let albumsError = false;
      const tracks = await BackendCall.getDanceabilityTracks({lowerLimit, upperLimit});
            console.log("All danceability tracks: ", tracks);

      if (!tracks.length) return;

      for (let track of tracks) {
        track["hasLyrics"] = true;
        track["inDatabase"] = true;
      }


    dispatch(addTracks(tracks));

  };
}

function addTracks(tracks) {
  return {type:GET_TRACKS, tracks};
}

// function updateArtistErrors(albumsError) {
//   return {type: UPDATE_SEARCH_ERROR, albumsError}
// }
