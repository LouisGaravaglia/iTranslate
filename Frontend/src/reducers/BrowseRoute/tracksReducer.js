import {GET_TRACKS, RESET_TRACKS} from "../../actionTypes";
const INITIAL_STATE = "";

export default function tracksReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_TRACKS:
      return action.tracks;
    case RESET_TRACKS:
      return "";
    default:
      return state;
  };
};