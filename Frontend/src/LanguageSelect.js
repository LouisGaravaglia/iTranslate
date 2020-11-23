import React from 'react';
import { Spring } from 'react-spring/renderprops';
import './App.css';
//COMPONENT IMPORTS
import SearchBar from "./SearchBar";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "./actionCreators/getTranslationCreator";

function LanguageSelect({selectedTrackId}) {
  //REDUX STORE
  const dispatch = useDispatch();
  const languages = useSelector(store => store.languages);
  const lyrics = useSelector(store => store.lyrics);

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const handleLanguageSearchSubmit = async (searchVal) => {
    dispatch(getTranslation(searchVal, languages, selectedTrackId, lyrics));   
  }

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
          
            <SearchBar header="Select which language you'd like your lyrics translated to!" handleSubmit={handleLanguageSearchSubmit}/>
         
        </div>
      )}

    </Spring>
  </div>
  );
};

export default LanguageSelect;
