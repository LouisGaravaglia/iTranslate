import {GET_LYRICS, UPDATE_LYRICS_ERROR} from "../actionTypes";
import BackendCall from '../BackendCall';

/**
* Contacts the database to get lyrics for the selected track.
* @param {string} trackId - spotify id of selected track
*/
export function getLyricsFromDB(trackId) {

  return async function(dispatch) {
    try {
      const lyrics = await BackendCall.getLyrics({trackId});

      if (lyrics === undefined || lyrics === 'No Lyrics') {
        throw new Error("Lyrics are not actual lyrics");
      };
      dispatch(addLyrics(lyrics));
    } catch(e) {
      dispatch(updateLyricsError(true));
    };
  };
};

function addLyrics(lyrics) {
  return {type: GET_LYRICS, lyrics};
};

function updateLyricsError(lyricsError) {
  return {type: UPDATE_LYRICS_ERROR, lyricsError};
};