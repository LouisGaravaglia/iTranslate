import React, {useState, useEffect} from 'react';
import {Spring} from 'react-spring/renderprops';
import './App.css';
//COMPONENT IMPORTS
import SearchBar from "./SearchBar";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "./actionCreators/getTranslationCreator";
//IONICONS IMPORTS
import IosMusicalNotes from 'react-ionicons/lib/IosMusicalNotes';

function LanguageSelect({selectedTrackId, typeOfSearch}) {
  //REACT STATE
  const [isLoading, setIsLoading] = useState(false);
  //REDUX STORE
  const dispatch = useDispatch();
  const languages = useSelector(store => store.languages);
  const lyrics = useSelector(store => store.lyrics);
  const translation = useSelector(store => store.translation);
  const translationError = useSelector(store => store.errors.translationError);
  const languageError = useSelector(store => store.errors.languageError);

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //WATCHES FOR EITHER AN ERROR OR THE TRANSLATION TO COME THROUGH TO REMOVE LOADING ICON
  useEffect(() => {

    const updateIsLoading = () => {
      if (translation || translationError || languageError) {
        setIsLoading(false);
      }
    };
    updateIsLoading();
  }, [translation, translationError, languageError])


  useEffect(() => {

    const updateIsLoading = () => {
    };
    updateIsLoading();
  }, [translation])
////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const handleLanguageSearchSubmit = async (searchVal) => {
    setIsLoading(true);
    try {
      dispatch(getTranslation(searchVal, languages, selectedTrackId, lyrics));
    } catch(e) {
      setIsLoading(false);
    };
  };

////////////////////////////////////////////////////  JSX  ////////////////////////////////////////////////////

  //DISPLAY LOADING ICON
  let LoadingIconDiv;
  
  if (isLoading) LoadingIconDiv = (
    <div className="Loading-Box">
      <IosMusicalNotes rotate={true} fontSize="200px" color="#fff"/>
    </div>
  );

  if (!isLoading) LoadingIconDiv = (
    <div className="Loading-Box"></div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div>
      <Spring
        from={{opacity: 0}}
        to={{opacity: 1}}
        config={{delay: 300, duration: 300}}
      >
      {props => (
        <div style={props}>
  
            <SearchBar loadingIcon={LoadingIconDiv} header="What language would you like your lyrics translated to?" handleSubmit={handleLanguageSearchSubmit} typeOfSearch={typeOfSearch}/>
         
        </div>
      )}
    </Spring>
  </div>
  );
};

export default LanguageSelect;