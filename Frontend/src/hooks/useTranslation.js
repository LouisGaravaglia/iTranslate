import React, {useContext, useState} from "react";
import '../App.css';
import UserContext from "../UserContext";
import IBMWatsonAPI from "../IBMWatsonAPI";
import BackendCall from '../BackendCall';


const  useTranslation = (searchVal, trackId, lyrics) => {
  const { languages } = useContext(UserContext);
  const [errors, setErrors] = useState({languageError: false, translationError: false})

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
        // setErrors(err => ({
        //   ...err,
        //   ["translationError"]:true
        // }));
      } else {
        await BackendCall.addTranslation({track_id: trackId, selectedLanguage: language, translation: IBMTranslation});
        return IBMTranslation;
      }

    } else {
      console.log("got transltion from DB");
      return response;
    }
  }

  const handleLanguageSearchSubmit = async (searchVal) => {
    console.log("IN CUSTOM HOOOOOK!!!!!");
    try{
      //FILTER OVER LANGUAGES IBM CAN TRANSLATE TO AND PULL OUT THE LANGUAGE-CODE OF THE LANGUAGE THE USER WANT'S TO USE
      const [{language}] = languages.filter(l => l.language_name.toLowerCase() === searchVal.toLowerCase());
      console.log("language is: ", language);

      const translation = getTranslation(language, trackId, lyrics);
      return translation;
    } catch(e) {
      errors["languageError"] = true;
      // setErrors(err => ({
      //   ...err,
      //   ["languageError"]:true
      // }));
      console.log("ERROR CHOOSING LANGUAGE");
    }
  }

  const translation = handleLanguageSearchSubmit(searchVal);

  return {translation, errors}
};

export default useTranslation;


// import { useEffect, useState } from "react";

// const useFetch = (url, options = {}) => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // after the first render, fetch our data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(url, options);
//         const json = await res.json();
//         setResponse(json);
//       } catch (error) {
//         setError(error);
//       }
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   return { response, error, isLoading };
// };

// export default useFetch;
