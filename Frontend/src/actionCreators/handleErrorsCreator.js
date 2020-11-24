import {RESET_TRANSLATION_ERROR, RESET_LYRICS_ERROR, RESET_SEARCH_ERROR, RESET_GENERAL_ERROR} from "../actionTypes";

////////////////////////////////// RESET LYRICS ERROR VALUE //////////////////////////////////

export function resetSearchError() {
  return async function(dispatch) {
    dispatch(updateSearchError());
  };
}
function updateSearchError() {
  return {type:RESET_SEARCH_ERROR};
}

////////////////////////////////// RESET LYRICS ERROR VALUE //////////////////////////////////

export function resetLyricsError() {
  return async function(dispatch) {
    dispatch(updateLyricsError());
  };
}
function updateLyricsError() {
  return {type:RESET_LYRICS_ERROR};
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

////////////////////////////////// RESET GENERAL ERROR VALUE //////////////////////////////////

export function resetGeneralError() {
  return async function(dispatch) {
    dispatch(updateGeneralError());
  };
}
function updateGeneralError() {
  return {type:RESET_GENERAL_ERROR};
}



