import { GET_TRANSLATION, UPDATE_TRANSLATION_ERRORS } from "../actionTypes";
import IBMWatsonAPI from "../IBMWatsonAPI";
import BackendCall from '../BackendCall';


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
          errors["translationError"] = true;
          return "No Translation Available";
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
        return "Could not read language value";
      }
    }

    const translation = await handleLanguageSearchSubmit(searchVal, languages);
    console.log("Here is my translation from actionCreator:");
    console.log(translation);
    console.log("here are my errors: ", errors);

    dispatch(retrieveTranslation(translation));
    dispatch(updateGetTranslationErrors(errors))
  };
}

function retrieveTranslation(translation) {
  return {type:GET_TRANSLATION, translation};
}

function updateGetTranslationErrors(errors) {
  return {type: UPDATE_TRANSLATION_ERRORS, errors}
}