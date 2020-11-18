import {GET_GENRES} from "../../../actionTypes";
import BackendCall from "../../../BackendCall";



////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getGenres() {

  return async function(dispatch) {
    // const searchError = false;


      const response = await BackendCall.getGenres();
      console.log("My genre array: ", response[0].genres);

    dispatch(addGenres(response[0].genres));
    // dispatch(updateGetTranslationErrors(searchError))
  };
}

function addGenres(genres) {
  return {type:GET_GENRES, genres};
}

// function updateGetTranslationErrors(searchError) {
//   return {type: UPDATE_SEARCH_ERROR, searchError}
// }
