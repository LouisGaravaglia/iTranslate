import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useSpring, animated, useTransition} from 'react-spring';
import {Spring} from 'react-spring/renderprops';
//COMPONENT IMPORTS
import SearchBar from "./SearchBar";
import FlashMessage from "./FlashMessage";
import LanguageSelect from "./LanguageSelect";
import LyricsTranslation from "./LyricsTranslation";
import Tracks from "./Tracks";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetSearchError} from "./actionCreators/handleErrorsCreator";
import {setResultsArray} from "./actionCreators/setResultsArrayCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
import useOnScreen from "./useOnScreen";

const SearchLanding = ({handleTrackSearchSubmit}) => {
  //STATE FOR ANIMATIONS
  const [bgColor, setBgColor] = useState("#ABA800");
  //REDUX STORE

 
////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <Spring
      from={{opacity: 1, marginLeft: -2500}}
      to={{opacity: 1, marginLeft: 0}}
      reverse={false}
      config={{delay: 0, duration: 200}}
    >
    {props => (
      <div style={props}>
  

        <div>
      <SearchBar header="Find your song!" handleSubmit={handleTrackSearchSubmit}/>

   {/* <div className="Browse-Landing">
            <button >Artists</button>
            <button >Genre</button>
            <button >Danceability</button>
          </div> */}
    

</div>

      </div>
    )}
    </Spring>
  );
}

export default SearchLanding;