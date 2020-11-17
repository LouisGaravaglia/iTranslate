import {GET_LYRICS} from "../actionTypes";
const INITIAL_STATE = "";

export default function lyricsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_LYRICS:
      return action.lyrics;
    default:
      return state;
  }
}


