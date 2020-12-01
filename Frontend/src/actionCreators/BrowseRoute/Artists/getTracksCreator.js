import {GET_TRACKS, UPDATE_GENERAL_ERROR} from "../../../actionTypes";
import BackendCall from "../../../BackendCall";

/**
* Gets all tracks for the selected album that exist in our backend and
* that contain at least one track that has lyrics. Updates tracks state.
* @param {string} albumId - spotify id for the selected album
*/
export function getTracks(albumId) {

  return async function(dispatch) {
    try {
      let tracks = await BackendCall.getTracks({albumId});

      for (let track of tracks) {
        track["hasLyrics"] = true;
        track["inDatabase"] = true;
      };
      console.log("This is what i'm updating tracks to be:  ", tracks);
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