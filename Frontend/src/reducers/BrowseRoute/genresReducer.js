import {GET_GENRES} from "../../actionTypes";
const INITIAL_STATE = "";

export default function genresReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_GENRES:
      return action.genres;
    default:
      return state;
  };
};