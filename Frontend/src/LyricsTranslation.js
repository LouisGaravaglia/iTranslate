import React from 'react';
import {Spring} from 'react-spring/renderprops';
import './App.css';
//REDUX IMPORTS
import {useSelector} from "react-redux";

function LyricsTranslation({typeOfLyricsTranslation}) {
  //REDUX STORE
  const translation = useSelector(store => store.translation);
  const lyrics = useSelector(store => store.lyrics);

  let lyricsClassName;
  let translationClassName;

  if (typeOfLyricsTranslation === "genre") lyricsClassName = "Lyrics Genre-Lyrics"
  if (typeOfLyricsTranslation === "genre") translationClassName = "Translation Genre-Translation"
  if (typeOfLyricsTranslation === "artists") lyricsClassName = "Lyrics Artist-Lyrics"
  if (typeOfLyricsTranslation === "artists") translationClassName = "Translation Artist-Translation"
    if (typeOfLyricsTranslation === "danceability") lyricsClassName = "Lyrics Danceability-Lyrics"
  if (typeOfLyricsTranslation === "danceability") translationClassName = "Translation Danceability-Translation"

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <Spring
      from={{opacity: 0}}
      to={{opacity: 1}}
      config={{delay: 300, duration: 300}}
    >
      {props => (
        <div style={props}>

          <div className="Lyrics-Translation">
            <div className="Lyrics-Container">
              <p className={lyricsClassName}>ORIGINAL LYRICS</p>
              <p className={lyricsClassName}>{lyrics}</p>
            </div>
            <div className="Translation-Container">
              <p className={translationClassName}>TRANSLATED LYRICS</p>
              <p className={translationClassName}>{translation}</p>
            </div>
          </div>

        </div>
      )}
    </Spring>
  );
};

export default LyricsTranslation;