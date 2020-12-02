import {GET_TRACKS, RESET_TRACKS} from "../../actionTypes";
const INITIAL_STATE = {tracks: ""};

export default function tracksReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_TRACKS:
      return {...state, tracks: action.tracks};
    case RESET_TRACKS:
      return "";
    default:
      return state;
  };
};

