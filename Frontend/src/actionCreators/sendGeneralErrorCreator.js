import {UPDATE_GENERAL_ERROR} from "../actionTypes";


////////////////////////////////// SEND A GENERAL ERROR//////////////////////////////////
export function sendGeneralError() {

  return async function(dispatch) {
    dispatch(updateGeneralError(true));
  };
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};
