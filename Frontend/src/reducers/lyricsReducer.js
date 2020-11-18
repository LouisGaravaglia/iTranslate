import {GET_LYRICS, RESET_LYRICS} from "../actionTypes";
const INITIAL_STATE = "";

export default function lyricsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_LYRICS:
      return action.lyrics;
    case RESET_LYRICS:
      return "";
    default:
      return state;
  }
}


