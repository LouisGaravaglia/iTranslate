import {ADD_TRACK} from "../actionTypes";

////////////////////////////////// ADD SELECTED TRACK OBJECT TO DATABSE //////////////////////////////////
export function addSelectedTrack(track) {

  return async function(dispatch) {
    dispatch(addTrack(track));
  };
};

function addTrack(track) {
  return {type:ADD_TRACK, track};
};