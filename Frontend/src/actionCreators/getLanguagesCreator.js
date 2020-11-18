import {GET_LANGUAGES} from "../actionTypes";
import IBMWatsonAPI from "../IBMWatsonAPI";



////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getLanguages() {

  return async function(dispatch) {
    const languages = await IBMWatsonAPI.getLanguages();
    console.log("HERE are the languages: ", languages);
    dispatch(addLanguages(languages));
    // dispatch(updateGetTranslationErrors(searchError))
  };
}

function addLanguages(languages) {
  return {type:GET_LANGUAGES, languages};
}

// function updateGetTranslationErrors(searchError) {
//   return {type: UPDATE_SEARCH_ERROR, searchError}
// }
