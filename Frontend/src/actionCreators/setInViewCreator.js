import {SET_IN_VIEW, UPDATE_GENERAL_ERROR} from "../actionTypes";

/**
* Creator used for setting the redux state to hold an inView object that
* will keep track of what section the user is currently viewing. This will
* then be used to trigger the appropriate background color. It's currenlty
* not being used, but would like to keep it around in case it becomes a more
* efficient way of correctly triggering the background color animation.
* @param {string} component - string label for each section of site used for BG color animation
*/
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
  return {type: SET_IN_VIEW, component};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};