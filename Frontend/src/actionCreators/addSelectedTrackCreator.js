import {ADD_TRACK} from "../actionTypes";

/**
* Adds the track object received from spotify to redux state 
* in order to be used in other components, mainly the spotify id.
* @param {object} track - object of track data from spotify
*/
export function addSelectedTrack(track) {

  return async function(dispatch) {
    dispatch(addTrack(track));
  };
};

function addTrack(track) {
  return {type: ADD_TRACK, track};
};