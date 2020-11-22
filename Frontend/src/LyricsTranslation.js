import React,  {useRef, useEffect, useCallback} from 'react';
import { Spring } from 'react-spring/renderprops';
import './App.css';
//COMPONENT IMPORTS
import DisplayLyrics from "./DisplayLyrics";
import SearchBar from "./SearchBar";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTranslation} from "./actionCreators/getTranslationCreator";

function LyricsTranslation({selectedTrackId}) {
  //REDUX STORE
  const dispatch = useDispatch();
  const languages = useSelector(store => store.languages);
  const translation = useSelector(store => store.translation);
  const lyrics = useSelector(store => store.lyrics);
  //REFS FOR PAGE TRAVERSAL
  const lyricsTranslationRef = useRef();
  const selectLanguageRef = useRef();


////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
        <Spring
    from={{opacity: 0}}
    to={{opacity: 1}}
    config={{delay: 300, duration: 300}}
    >
      {props => (
        <div style={props}>
          <div className="Lyrics-Translation" ref={lyricsTranslationRef}>
            <div className="Lyrics-Container">
              <p className="Lyrics">ORIGINAL LYRICS</p>
              <p className="Lyrics">{lyrics}</p>
            </div>
            <div className="Translation-Container">
              <p className="Translation">TRANSLATED LYRICS</p>
              <p className="Translation">{translation}</p>
            </div>
          </div>
              </div>
      )}
    </Spring>
    
  </>
  );
}

export default LyricsTranslation;
