import React, {useState, useRef, useEffect} from 'react';
import {useSpring, animated} from 'react-spring';
import './App.css';
//COMPONENT IMPORTS
import FlashMessage from "./FlashMessage";
import Categories from "./BrowseCategories";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetGeneralError} from "./actionCreators/handleErrorsCreator";

function Browse() {
  //REDUX STORE
  const dispatch = useDispatch();


  const categoryRef = useRef();
  
// ////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

//   //LISTENS FOR ANY CHANGES IN ERRORS IN STATE AND WILL TRIGGER FLASH MESSAGES ACCORDINGLY
//   useEffect(() => {
//     const displayFlashMessage = () => {

//         if (lyricsError) {
//           setNoLyricsFlashMessage(true);
//           console.log("There is a lyrics error");
//           dispatch(resetLyricsError());
//         }
//         if (languageError) {
//           setLanguageNotFoundFlashMessage(true);
//           console.log("Here is what language error is: ", languageError);
//           dispatch(resetLanguageError());
//         }
//         if (languageError) {
//           setTranslationErrorFlashMessage(true);
//           console.log("Here is what translation error is: ", translationError);
//           dispatch(resetTranslationError());
//         }
//         if (generalError) {
//           setGeneralErrorFlashMessage(true);
//           console.log("Here is what general error is: ", generalError);
//           dispatch(resetGeneralError());
//         }

//     }
//     displayFlashMessage();
//   }, [languageError, translationError, lyricsError, generalError, dispatch])

////////////////////////////////////////////////////  ANIMATION FOR BACKGROUND COLOR  ////////////////////////////////////////////////////

  const springProps = useSpring({
    backgroundColor: "#8700B0",
    config: {duration: 300}
  });

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY BROWSE BY ARTISTS COMPONENTS
  let ChooseCategoryDiv = (
    <animated.div style={springProps} ref={categoryRef}>
      <Categories needAnimation={true}/>
    </animated.div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div>
      {ChooseCategoryDiv}
    </div>
  );
};

export default Browse;
