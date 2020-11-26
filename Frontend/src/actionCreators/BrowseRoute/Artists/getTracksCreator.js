import { GET_TRACKS, UPDATE_GENERAL_ERROR } from "../../../actionTypes";
import BackendCall from "../../../BackendCall";

////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getTracks(albumId) {

  return async function(dispatch) {

    try {
      let tracks = await BackendCall.getTracks({albumId});

      for (let track of tracks) {
        track["hasLyrics"] = true;
        track["inDatabase"] = true;
      }

      console.log("here are the tracks from getTracksCREATOR", tracks);
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