import {GET_ALL_ARTISTS} from "../../actionTypes";
const INITIAL_STATE = "";

export default function allArtistsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_ALL_ARTISTS:
      return action.artists;
    default:
      return state;
  }
}