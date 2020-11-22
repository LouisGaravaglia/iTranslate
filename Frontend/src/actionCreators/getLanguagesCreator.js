import {GET_LANGUAGES, UPDATE_GENERAL_ERROR} from "../actionTypes";
import IBMWatsonAPI from "../IBMWatsonAPI";

////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getLanguages() {

  return async function(dispatch) {

    try {
      const languages = await IBMWatsonAPI.getLanguages();
      console.log("HERE are the languages: ", languages);
      dispatch(addLanguages(languages));
    } catch(e) {
      dispatch(addLanguages([{language:""}]));
      dispatch(updateGeneralError(true));
    };
  };
};

function addLanguages(languages) {
  return {type:GET_LANGUAGES, languages};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};
