import React, {useState, useEffect} from 'react';
import { Spring } from 'react-spring/renderprops';
import './App.css';
//COMPONENT IMPORTS
import SearchBar from "./SearchBar";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "./actionCreators/getTranslationCreator";
//IONICONS IMPORTS
import MdPizza from 'react-ionicons/lib/MdPizza';

function LanguageSelect({selectedTrackId}) {
  //REDUX STORE
  const [isLoading, setIsLoading] = useState(false);
  //REDUX STORE
  const dispatch = useDispatch();
  const languages = useSelector(store => store.languages);
  const lyrics = useSelector(store => store.lyrics);
  const translation = useSelector(store => store.translation);
  const languageError = useSelector(store => store.errors.languageError);
  const translationError = useSelector(store => store.errors.translationError);

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  useEffect(() => {
    const updateIsLoading = () => {
      if (translation || translationError || languageError) setIsLoading(false);
    };
    updateIsLoading();
  }, [translation, translationError, languageError])
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
    // <div className="Loading-Container">
      <div className="Loading-Box">
        <MdPizza rotate={true} fontSize="300px" color="orange" />
      </div>
    // </div>
  );

  if (!isLoading) LoadingIconDiv = (
    // <div className="Loading-Container">
      <div className="Loading-Box">
      </div>
    // </div>
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
  
            <SearchBar loadingIcon={LoadingIconDiv} header="Select which language you'd like your lyrics translated to!" handleSubmit={handleLanguageSearchSubmit}/>
         
        </div>
      )}

    </Spring>
  </div>
  );
};

export default LanguageSelect;
