import { GET_LYRICS, UPDATE_LYRICS_ERROR } from "../actionTypes";
import LyricsAPI from "../LyricsAPI";
import BackendCall from '../BackendCall';


////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getLyricsFromDB(track_id) {

  return async function(dispatch) {
    //VARIBLE THAT KEEPS TRACK OF ANY ERROR REQUESTING LYRICS
    let lyricsError = false;

     try {
        //GET THE LYRICS THAT ARE DEFINITELY STORED IN DATABASE
        const lyrics = await BackendCall.getLyrics({track_id});
        console.log("Setting lyrics to be from the DB: ", lyrics);
        dispatch(addLyrics(lyrics));
     } catch(e) {
       //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
       lyricsError = true;
       dispatch(updateLyricsError(lyricsError))
     };
  };
};

function addLyrics(lyrics) {
  return {type:GET_LYRICS, lyrics};
}

function updateLyricsError(lyricsError) {
  return {type: UPDATE_LYRICS_ERROR, lyricsError}
}
