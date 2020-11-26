import {GET_LANGUAGES, UPDATE_GENERAL_ERROR} from "../actionTypes";
import IBMWatsonAPI from "../IBMWatsonAPI";

/**
* Makes a call to the IBM API to get the array of approved target
* languages we can translate to.
*/
export function getLanguages() {

  return async function(dispatch) {
    try {
      const languages = await IBMWatsonAPI.getLanguages();
      dispatch(addLanguages(languages));
    } catch(e) {
      dispatch(addLanguages([{language:""}]));
      dispatch(updateGeneralError(true));
    };
  };
};

function addLanguages(languages) {
  return {type: GET_LANGUAGES, languages};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};