import {GET_LYRICS, UPDATE_LYRICS_ERROR} from "../actionTypes";
import BackendCall from '../BackendCall';

/**
* Makes a call to the lyrics API to see if lyrics exist for this song. If they
* do, set lyrics in state and add to databse. 
* Else, add "No Lyrics" for track in database.
* @param {string} track_id - spotify id for track
* @param {string} artist - artist name
* @param {string} track - track name
*/
export function findLyricsFromAPI(track_id, artist, track) {

  return async function(dispatch) {
    try {
      //GET LYRICS FROM LYRICS API
      const lyrics = await BackendCall.getLyricsFromAPI({artist, track});

      //IF THERE ARE NO LYRICS FOR THAT SONG FROM LYRICS API
      if (lyrics === "No Lyrics from API") {
        //ADD "NO LYRICS" AS THE LYRICS VALUE FOR THAT TRACK IN THE DATABASE
        await BackendCall.addLyrics({track_id, lyrics: "No Lyrics"});
        dispatch(updateLyricsError(true));
      } else {
        //ADD LYRICS TO THAT TRACK IN THE DATABASE
        await BackendCall.addLyrics({track_id, lyrics});
        dispatch(addLyrics(lyrics));
      };

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