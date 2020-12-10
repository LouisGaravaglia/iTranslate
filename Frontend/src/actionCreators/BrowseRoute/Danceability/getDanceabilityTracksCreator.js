import {GET_TRACKS, UPDATE_GENERAL_ERROR} from "../../../actionTypes";
import BackendCall from "../../../BackendCall";


/**
* Makes a call to the backend and queries for all tracks with a given 
* danceability score that falls in the range passed in as the arguments. Adds
* that array to tracks state.
* @param {float} lowerLimit - lowerLimit of range for danceability score
* @param {float} upperLimit - upperLimit of range for danceability score
*/
export function getDanceabilityTracks(lowerLimit, upperLimit) {

  return async function(dispatch) {
    try {
      const tracks = await BackendCall.getDanceabilityTracks({lowerLimit, upperLimit});

      if (!tracks.length) {
        dispatch(addTracks(""));
        return;
      };

      for (let track of tracks) {
        track["hasLyrics"] = true;
        track["inDatabase"] = true;
      };

      dispatch(addTracks(tracks));
    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function addTracks(tracks) {
  return {type: GET_TRACKS, tracks};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};