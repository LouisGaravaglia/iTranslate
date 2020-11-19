import { GET_TRACKS } from "../../../actionTypes";
import SpotifyAPI from "../../../SpotifyAPI";
import BackendCall from "../../../BackendCall";


////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getTracks(albumID) {

  return async function(dispatch) {
    // let albumsError = false;
    
    const handleAlbumClick = async (albumID) => {
      const [tracks, albumId] = await SpotifyAPI.getTracks(albumID);
      const newTracksArray = [];
      console.log("here are the tracks", tracks);

      //Loop over tracks array and make new array with consolidated objects
      for (let track of tracks) {

        let checkmarkVal = await BackendCall.getCheckmarkValue({trackId: track.id});

        newTracksArray.push({
          trackId: track.id, 
          trackName: track.name, 
          artistId: track.artists[0].id,
          artistName: track.artists[0].name,
          albumId,
          checkmarkVal
          })
      }


      return newTracksArray;
    }
    
    const tracks = await handleAlbumClick(albumID);
    
    dispatch(addTracks(tracks));
    // dispatch(updateArtistErrors(tracksError))
  };
}

function addTracks(tracks) {
  return {type:GET_TRACKS, tracks};
}

// function updateArtistErrors(albumsError) {
//   return {type: UPDATE_SEARCH_ERROR, albumsError}
// }
