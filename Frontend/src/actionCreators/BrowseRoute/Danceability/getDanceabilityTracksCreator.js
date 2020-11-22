import { GET_TRACKS, UPDATE_GENERAL_ERROR } from "../../../actionTypes";
import BackendCall from "../../../BackendCall";



////////////////////////////////// GET ALL TRACKS //////////////////////////////////
export function getDanceabilityTracks(lowerLimit, upperLimit) {

  return async function(dispatch) {
    console.log("fetching danceability: ", lowerLimit, upperLimit);
    
    try {
      const tracks = await BackendCall.getDanceabilityTracks({lowerLimit, upperLimit});
      console.log("All danceability tracks: ", tracks);

      if (!tracks.length) {
        dispatch(addTracks(""));
        return;
      }

      for (let track of tracks) {
        track["hasLyrics"] = true;
        track["inDatabase"] = true;
      }

      dispatch(addTracks(tracks));

    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function addTracks(tracks) {
  return {type:GET_TRACKS, tracks};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};
