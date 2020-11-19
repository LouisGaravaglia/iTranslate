import { GET_LYRICS, UPDATE_LYRICS_ERROR } from "../actionTypes";
import LyricsAPI from "../LyricsAPI";
import BackendCall from '../BackendCall';


////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getLyrics(trackData, artistData, albumData, artist, track) {

  return async function(dispatch) {
    //VARIBLE THAT KEEPS TRACK OF ANY ERROR REQUESTING LYRICS
    let lyricsError = false;

    const findLyrics = async (trackData, artistData, albumData, artist, track) => {
      //ADD TRACK/ARTIST/ALBUM DATA TO BACKEND, IF NOT ALREADY THERE
      const response = await BackendCall.addTrackArtistAlbum(trackData, artistData, albumData);

      //IF THAT TRACK DIDN'T ALREADY EXIST IN THE DATABASE
      if (response === "Added new track to the DB") {
        //GET LYRICS FROM LYRICS API
        const APILyrics = await LyricsAPI.getLyrics(artist, track);
        console.log("APILyrics = ", APILyrics);

        //IF THERE ARE NO LYRICS FOR THAT SONG FROM LYRICS API
        if (APILyrics === "No Lyrics from API") {
          //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
          lyricsError = true;
          console.log("No lyrics apparently: ", APILyrics);
          //ADD "NO LYRICS" AS THE LYRICS VALUE FOR THAT TRACK IN THE DATABASE
          await BackendCall.addLyrics({track_id: trackData.spotify_id, lyrics: "No Lyrics"});
          return "";
        } else {
          console.log("SET LYRICS IN FIRST CONDTIONAL");
          //ADD LYRICS TO THAT TRACK IN THE DATABASE
          await BackendCall.addLyrics({track_id: trackData.spotify_id, lyrics: APILyrics});
          return APILyrics;
        }

      //IF THAT TRACK ALREADY EXISTED IN THE DATABASE
      } else {
        //GET THE LYRICS THAT ARE STORED IN DATABASE (IT COULD BE "NO LYRICS" THOUGH)
        const databaseLyrics = await BackendCall.getLyrics({track_id: trackData.spotify_id});
        console.log("Setting lyrics to be from the DB: ", databaseLyrics);

        //IF LYRICS IS THE PLACEHOLDER "NO LYRICS"
        if (databaseLyrics === "No Lyrics") {
          //TRY A SECOND TIME TO GET LYRICS BECAUSE THIS API DOESNT ALWAYS WORK OR NEW LYRICS MAY HAVE BEEN ADDED TO API
          const APILyrics2ndAttempt = await LyricsAPI.getLyrics(artist, track);
          console.log("APILyrics = ", APILyrics2ndAttempt);

          //IF WE DON'T GET LYRICS FROM THE 2ND+ ATTEMPT, LOG ERROR
          if (APILyrics2ndAttempt === "No Lyrics from API") {
            //FLASH MESSAGE SAYING NO LYRICS EXIST FOR THAT SONG
            lyricsError = true;
            console.log("THE Lyrics in the db = ", APILyrics2ndAttempt);
            return "";
          //IF WE DO GET LYRICS FROM THE 2ND+ ATTEMPT, ADD TO DATABASE
          } else {
            console.log("SET LYRICS IN FIRST CONDTIONAL");
            //ADD LYRICS TO THAT TRACK IN THE DATABASE
            await BackendCall.addLyrics({track_id: trackData.spotify_id, lyrics: APILyrics2ndAttempt});
            return APILyrics2ndAttempt;
          }

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
