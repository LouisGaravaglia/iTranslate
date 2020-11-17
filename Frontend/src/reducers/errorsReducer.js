import {UPDATE_TRANSLATION_ERRORS, UPDATE_LYRICS_ERROR, RESET_LYRICS_ERROR, RESET_LANGUAGE_ERROR, RESET_TRANSLATION_ERROR} from "../actionTypes";
const INITIAL_STATE = {searchError: false, lyricsError: false, languageError: false, translationError: false}

export default function errorsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case UPDATE_TRANSLATION_ERRORS:
      return {...state, languageError: action.errors.languageError, translationError: action.errors.translationError}
    case UPDATE_LYRICS_ERROR:
      console.log("This is the action value: ", action);
      return {...state, lyricsError: action.lyricsError}
    case RESET_LANGUAGE_ERROR:
      return {...state, languageError: false};
    case RESET_TRANSLATION_ERROR:
      return {...state, translationError: false};
    case RESET_LYRICS_ERROR:
      return {...state, lyricsError: false};
    default:
      return state;
  }
}
