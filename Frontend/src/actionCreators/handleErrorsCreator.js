import {  RESET_LANGUAGE_ERROR, RESET_TRANSLATION_ERROR } from "../actionTypes";


////////////////////////////////// RESET LANGUAGE ERROR VALUE //////////////////////////////////

export function resetLanguageError() {
  return async function(dispatch) {
    dispatch(updateLanguageError());
  };
}
function updateLanguageError() {
  return {type:RESET_LANGUAGE_ERROR};
}

////////////////////////////////// RESET TRANSLATION ERROR VALUE //////////////////////////////////

export function resetTranslationError() {
  return async function(dispatch) {
    dispatch(updateTranslationError());
  };
}
function updateTranslationError() {
  return {type:RESET_TRANSLATION_ERROR};
}




