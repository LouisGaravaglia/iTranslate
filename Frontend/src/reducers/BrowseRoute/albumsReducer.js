import {GET_ALBUMS} from "../../actionTypes";
const INITIAL_STATE = "";

export default function albumsRedcuer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_ALBUMS:
      return action.albums;
    default:
      return state;
  }
}