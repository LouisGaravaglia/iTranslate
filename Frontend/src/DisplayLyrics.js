import React from 'react';

const DisplayLyrics = ( { lyrics, translation} ) => {

  return (
    <>
      <div className="Browse-Lyrics-Container">
        <p className="Browse-Lyrics">ORIGINAL LYRICS</p>
        <p className="Browse-Lyrics">{lyrics}</p>
      </div>
      <div className="Browse-Translation-Container">
        <p className="Browse-Translation">TRANSLATED LYRICS</p>
        <p className="Browse-Translation">{translation}</p>
      </div>
  </>
  );

};

export default DisplayLyrics;