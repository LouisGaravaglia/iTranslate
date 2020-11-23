import {SET_IN_VIEW, UPDATE_GENERAL_ERROR} from "../actionTypes";

////////////////////////////////// UPDATE BACKGROUND COLOR //////////////////////////////////
export function setInView(component) {

  return async function(dispatch) {

    try {
      dispatch(updateInView(component));
    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function updateInView(component) {
  return {type:SET_IN_VIEW, component};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};
