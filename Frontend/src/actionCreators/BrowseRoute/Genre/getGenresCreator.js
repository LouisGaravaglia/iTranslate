import {GET_GENRES} from "../../../actionTypes";
import BackendCall from "../../../BackendCall";



////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getGenres() {

  return async function(dispatch) {
    // let searchError = false;
    const response = await BackendCall.getGenres();
    const genreArray = response[0].genres.split(",");
    const sortedGenres = []

    for (let i = 0; i < genreArray.length; i++) {
      sortedGenres.push(genreArray[i].trim().toUpperCase());
    }

    const genres = [...new Set(sortedGenres.sort())];
    console.log("My genre array: ", genres);

    dispatch(addGenres(genres));
    // dispatch(updateGetTranslationErrors(searchError))
  };
}

function addGenres(genres) {
  return {type:GET_GENRES, genres};
}

// function updateGetTranslationErrors(searchError) {
//   return {type: UPDATE_SEARCH_ERROR, searchError}
// }









// import {GET_GENRES} from "../../../actionTypes";
// import BackendCall from "../../../BackendCall";



// ////////////////////////////////// GET ALL POSTS //////////////////////////////////
// export function getGenres() {

//   return async function(dispatch) {
//     // let searchError = false;
//     const response = await BackendCall.getGenres();
//     const genreArray = response[0].genres.split(",");
//     const sortedGenres = []

//     for (let i = 0; i < genreArray.length; i++) {
//       sortedGenres.push(genreArray[i].trim().toUpperCase());
//     }

//     const genres = [...new Set(sortedGenres.sort())];
//     console.log("My genre array: ", genres);

//     dispatch(addGenres(genres));
//     // dispatch(updateGetTranslationErrors(searchError))
//   };
// }

// function addGenres(genres) {
//   return {type:GET_GENRES, genres};
// }

// // function updateGetTranslationErrors(searchError) {
// //   return {type: UPDATE_SEARCH_ERROR, searchError}
// // }
