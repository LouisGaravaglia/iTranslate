import {GET_TRANSLATION, UPDATE_TRANSLATION_ERRORS} from "../actionTypes";
import IBMWatsonAPI from "../IBMWatsonAPI";
import BackendCall from '../BackendCall';

/**
* Receives the lyrics and desired target language and checks the databse
* to see if we have that specific translation. If not, it will make a call
* to the IBM API to get translation. 
* @param {string} targetLanguage - language input value user entered
* @param {array} languages - available languages IBM can translate to
* @param {string} trackId - spotify id of song selected
* @param {string} lyrics - lyrics from song selected
*/
export function getTranslation(targetLanguage, languages, trackId, lyrics) {

  return async function(dispatch) {
    const errors = {languageError: false, translationError: false};

    const fetchTranslation = async (language, trackId, lyrics) => {
      try {

        //CHECKING TO SEE IF WE HAVE THAT SONG WITH THAT TRACK ID AND THE SPECIFIED LANGUAGE IN OUR TRANSLATION TABLE
        const response = await BackendCall.getTranslationFromDB({track_id: trackId, selectedLanguage: language});

        if (response === "No Translation in DB") {
          const IBMTranslation = await IBMWatsonAPI.getTranslationFromAPI(lyrics, language);

          if (IBMTranslation === "Error attempting to read source text") {
            errors["translationError"] = true;
            return "No Translation Available";
          } else {
            await BackendCall.addTranslation({track_id: trackId, language, translation: IBMTranslation});
            return IBMTranslation;
          };
        } else {
          return response;
        };

      } catch(e) {
        errors["translationError"] = true;
        return "No Translation Available";
      };
    };

    const handleLanguageSearchSubmit = async (targetLanguage, languages) => {
      let language;
      try{
        //FILTER OVER LANGUAGES IBM CAN TRANSLATE TO AND PULL OUT THE LANGUAGE-CODE OF THE LANGUAGE THE USER WANT'S TO USE
        [{language}] = languages.filter(l => l.language_name.toLowerCase() === targetLanguage.toLowerCase());
      } catch(e) {
        errors["languageError"] = true;
        return "Could not read language value";
      };

      const translation = await fetchTranslation(language, trackId, lyrics);
      return translation;
    };

    const translation = await handleLanguageSearchSubmit(targetLanguage, languages);
    dispatch(retrieveTranslation(translation));
    dispatch(updateGetTranslationErrors(errors));
  };
};

function retrieveTranslation(translation) {
  return {type: GET_TRANSLATION, translation};
};

function updateGetTranslationErrors(errors) {
  return {type: UPDATE_TRANSLATION_ERRORS, errors};
};