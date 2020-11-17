import {  RESET_LANGUAGE_ERROR, RESET_TRANSLATION_ERROR, RESET_LYRICS_ERROR } from "../actionTypes";

////////////////////////////////// RESET LYRICS ERROR VALUE //////////////////////////////////

export function resetLyricsError() {
  return async function(dispatch) {
    dispatch(updateLyricsError());
  };
}
function updateLyricsError() {
  return {type:RESET_LYRICS_ERROR};
}

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




