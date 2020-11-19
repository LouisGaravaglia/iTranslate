import { GET_LYRICS, UPDATE_LYRICS_ERROR } from "../actionTypes";
import LyricsAPI from "../LyricsAPI";
import BackendCall from '../BackendCall';


////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function findLyricsFromAPI(track_id, artist, track) {

  return async function(dispatch) {
    //VARIBLE THAT KEEPS TRACK OF ANY ERROR REQUESTING LYRICS
    let lyricsError = false;

    try {
      //GET LYRICS FROM LYRICS API
      const lyrics = await LyricsAPI.getLyrics(artist, track);
      console.log("lyrics = ", lyrics);

      //IF THERE ARE NO LYRICS FOR THAT SONG FROM LYRICS API
      if (lyrics === "No Lyrics from API") {
        console.log("No lyrics apparently: ", lyrics);
        //ADD "NO LYRICS" AS THE LYRICS VALUE FOR THAT TRACK IN THE DATABASE
        await BackendCall.addLyrics({track_id, lyrics: "No Lyrics"});
        //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
        lyricsError = true;
        dispatch(updateLyricsError(lyricsError))
      } else {
        console.log("SET LYRICS IN FIRST CONDTIONAL");
        //ADD LYRICS TO THAT TRACK IN THE DATABASE
        await BackendCall.addLyrics({track_id, lyrics});
        dispatch(addLyrics(lyrics));
      };

    } catch(e) {
      //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
      lyricsError = true;
      dispatch(updateLyricsError(lyricsError))
    };
  };
};

function addLyrics(lyrics) {
  return {type:GET_LYRICS, lyrics};
};

function updateLyricsError(lyricsError) {
  return {type: UPDATE_LYRICS_ERROR, lyricsError}
};
