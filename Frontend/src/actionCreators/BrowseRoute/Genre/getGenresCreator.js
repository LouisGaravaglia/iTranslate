import {GET_GENRES, UPDATE_GENERAL_ERROR} from "../../../actionTypes";
import BackendCall from "../../../BackendCall";

/**
* Gets the array of genres compiled from all artists who have at least
* one song in the database.
*/
export function getGenres() {

  return async function(dispatch) {
    try {
      const response = await BackendCall.getGenres();
      const genreArray = response[0].genres.split(",");
      const sortedGenres = [];

      for (let i = 0; i < genreArray.length; i++) {
        sortedGenres.push(genreArray[i].trim().toUpperCase());
      };
      const genres = [...new Set(sortedGenres.sort())];
      dispatch(addGenres(genres));
    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function addGenres(genres) {
  return {type: GET_GENRES, genres};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};