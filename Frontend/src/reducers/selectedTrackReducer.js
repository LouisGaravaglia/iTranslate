import {ADD_TRACK, RESET_SELECTED_TRACK} from "../actionTypes";
const INITIAL_STATE = "";

export default function selectedTrackReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_TRACK:
      return action.track;
    case RESET_SELECTED_TRACK:
      return "";
    default:
      return state;
  };
};