import {UPDATE_ERRORS, RESET_LANGUAGE_ERROR, RESET_TRANSLATION_ERROR} from "../actionTypes";
const INITIAL_STATE = {searchError: false, languageError: false, translationError: false}

export default function errorsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case UPDATE_ERRORS:
      return {...state, languageError: action.errors.languageError, translationError: action.errors.translationError}
    case RESET_LANGUAGE_ERROR:
      return {...state, languageError: false};
    case RESET_TRANSLATION_ERROR:
      return {...state, translationError: false};
    default:
      return state;
  }
}
