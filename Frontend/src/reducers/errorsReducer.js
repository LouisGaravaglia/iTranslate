import {UPDATE_TRANSLATION_ERROR, UPDATE_LYRICS_ERROR, UPDATE_SEARCH_ERROR, RESET_LYRICS_ERROR, RESET_TRANSLATION_ERROR, RESET_SEARCH_ERROR, UPDATE_GENERAL_ERROR, RESET_GENERAL_ERROR} from "../actionTypes";
const INITIAL_STATE = {generalError: false, searchError: false, lyricsError: false, translationError: false}

export default function errorsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    //UPDATE ERROR VALUES IN CASE ANY ERROR WERE CAUGHT IN ACTION CREATORS
    case UPDATE_TRANSLATION_ERROR:
      return {...state, translationError: action.translationError};
    case UPDATE_LYRICS_ERROR:
      return {...state, lyricsError: action.lyricsError};
    case UPDATE_SEARCH_ERROR:
      return {...state, searchError: action.searchError};
    case UPDATE_GENERAL_ERROR:
      return {...state, generalError: action.generalError};
    //RESET ERROR VALUES BACK TO FALSE AFTER TRIGGERING A FLASH MESSAGE
    case RESET_TRANSLATION_ERROR:
      return {...state, translationError: false};
    case RESET_LYRICS_ERROR:
      return {...state, lyricsError: false};
    case RESET_SEARCH_ERROR:
      return {...state, searchError: false};
    case RESET_GENERAL_ERROR:
      return {...state, generalError: false};
    default:
      return state;
  }
}
