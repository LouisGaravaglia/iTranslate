import { GET_TRANSLATION, RESET_LANGUAGE_ERROR } from "./actionTypes";
import IBMWatsonAPI from "./IBMWatsonAPI";
import BackendCall from './BackendCall';
// import FlashMessage from "./FlashMessage";

// const POSTS_URL = "http://localhost:5000/api/posts"

////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getTranslation(searchVal, languages, trackId, lyrics) {
    return async function(dispatch) {
         const errors = {languageError: false, translationError: false};

  const getTranslation = async (language, trackId, lyrics) => {
    //CHECKING TO SEE IF WE HAVE THAT SONG WITH THAT TRACK ID AND THE SPECIFIED LANGUAGE IN OUR TRANSLATION TABLE
    const response = await BackendCall.getTranslation({track_id: trackId, selectedLanguage: language});
    console.log("databaseTranslation: ", response);

    if (response === "No Translation in DB") {
      const IBMTranslation = await IBMWatsonAPI.getTranslation(lyrics, language);
      console.log("Translated lyrics: ", IBMTranslation);

      if (IBMTranslation === "Error attempting to read source text") {
        //FLASH MESSAGE SAYING TRANSLATION WAS NOT FOUND
        // setTranslationErrorFlashMessage(true);
        errors["translationError"] = true;
        // setErrors(err => ({
        //   ...err,
        //   ["translationError"]:true
        // }));
      } else {
        await BackendCall.addTranslation({track_id: trackId, language, translation: IBMTranslation});
        return IBMTranslation;
      }

    } else {
      console.log("got transltion from DB");
      return response;
    }
  }

  const handleLanguageSearchSubmit = async (searchVal, languages) => {
    console.log("IN REACT ACTION CREATOR!!!!!");
    try{
      //FILTER OVER LANGUAGES IBM CAN TRANSLATE TO AND PULL OUT THE LANGUAGE-CODE OF THE LANGUAGE THE USER WANT'S TO USE
      const [{language}] = languages.filter(l => l.language_name.toLowerCase() === searchVal.toLowerCase());
      console.log("language is: ", language);

      const translation = await getTranslation(language, trackId, lyrics);
      return translation;
    } catch(e) {
      errors["languageError"] = true;
      // setLanguageNotFoundFlashMessage(true);
      // setErrors(err => ({
      //   ...err,
      //   ["languageError"]:true
      // }));
      console.log("ERROR CHOOSING LANGUAGE");
    }
  }

  const translation = await handleLanguageSearchSubmit(searchVal, languages);
  console.log("Here is my translation from actionCreator:");
  console.log(translation);
  console.log("here are my errors: ", errors);

       
        dispatch(retrieveTranslation(translation, errors));
    };
}

function retrieveTranslation(translation, errors) {
    return {type:GET_TRANSLATION, translation, errors};
}

////////////////////////////////// RESET LANGUAGE ERROR VALUE //////////////////////////////////
export function resetLanguageError() {
    return async function(dispatch) {
        dispatch(updateLanguageError());
    };
}
function updateLanguageError() {
    return {type:RESET_LANGUAGE_ERROR};
}



