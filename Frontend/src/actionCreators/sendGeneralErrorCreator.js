import {UPDATE_GENERAL_ERROR} from "../actionTypes";

/**
* A general error object for redux state that holds a boolean value
* depending on whether a general error has occured in the app.
*/
export function sendGeneralError() {

  return async function(dispatch) {
    dispatch(updateGeneralError(true));
  };
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};