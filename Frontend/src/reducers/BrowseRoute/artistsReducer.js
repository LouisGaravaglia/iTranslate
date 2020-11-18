import {GET_ARTISTS} from "../../actionTypes";
const INITIAL_STATE = "";

export default function artistsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_ARTISTS:
      return action.artists;
    default:
      return state;
  }
}