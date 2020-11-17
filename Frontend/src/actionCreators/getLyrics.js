import { GET_LYRICS, UPDATE_LYRICS_ERROR } from "../actionTypes";
import LyricsAPI from "../LyricsAPI";
import BackendCall from '../BackendCall';


////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getLyrics(trackData, artistData, albumData, artist, track) {

  return async function(dispatch) {
    let lyricsError = false;

    const findLyrics = async (trackData, artistData, albumData, artist, track) => {
      const response = await BackendCall.addTrackArtistAlbum(trackData, artistData, albumData);

      if (response === "Added new track to the DB") {
        const APILyrics = await LyricsAPI.getLyrics(artist, track);
        console.log("APILyrics = ", APILyrics);

        if (APILyrics === "No Lyrics from API") {
          //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
          lyricsError = true;
          console.log("No lyrics apparently: ", APILyrics);
          await BackendCall.addLyrics({track_id: trackData.spotify_id, lyrics: "No Lyrics"});
          return "";
        } else {
          console.log("SET LYRICS IN FIRST CONDTIONAL");
          //PASSING AN OBJECT TO STATE SO THAT USE-EFFECT IS TRIGGERED BECAUSE STATE IS FORCED TO UPDATE EVEN IF THE LYRICS ARE THE SAME
          // setLyrics([APILyrics, {}]);
          await BackendCall.addLyrics({track_id: trackData.spotify_id, lyrics: APILyrics});
          return APILyrics;
        }

      } else {
        const databaseLyrics = await BackendCall.getLyrics({track_id: trackData.spotify_id});
        console.log("Setting lyrics to be from the DB: ", databaseLyrics);

        if (databaseLyrics === "No Lyrics") {
          //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
          lyricsError = true;
          console.log("THE Lyrics in the db = ", databaseLyrics);
          return "";
        } else {
          console.log("SET LYRICS IN SECOND CONDTIONAL");
          return databaseLyrics;
          // setLyrics([databaseLyrics, {}]);
        }
      }
    }
    const lyrics = await findLyrics(trackData, artistData, albumData, artist, track);

    dispatch(addLyrics(lyrics));
    dispatch(updateLyricsError(lyricsError))
  };
}

function addLyrics(lyrics) {
  return {type:GET_LYRICS, lyrics};
}

function updateLyricsError(lyricsError) {
  return {type: UPDATE_LYRICS_ERROR, lyricsError}
}
