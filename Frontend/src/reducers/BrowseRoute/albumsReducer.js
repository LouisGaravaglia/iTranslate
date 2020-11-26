import {GET_ALBUMS, RESET_ALBUMS} from "../../actionTypes";
const INITIAL_STATE = "";

export default function albumsRedcuer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_ALBUMS:
      return action.albums;
    case RESET_ALBUMS:
      return "";
    default:
      return state;
  };
};