import {GET_ARTISTS, RESET_ARTISTS} from "../../actionTypes";
const INITIAL_STATE = "";

export default function artistsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_ARTISTS:
      return action.artists;
    case RESET_ARTISTS:
      return "";
    default:
      return state;
  };
};