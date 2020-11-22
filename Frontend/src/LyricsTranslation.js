import React from 'react';
import { Spring } from 'react-spring/renderprops';
import './App.css';
//REDUX IMPORTS
import {useSelector} from "react-redux";

function LyricsTranslation() {
  //REDUX STORE
  const translation = useSelector(store => store.translation);
  const lyrics = useSelector(store => store.lyrics);

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

          <div className="Lyrics-Translation">
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
};

export default LyricsTranslation;
