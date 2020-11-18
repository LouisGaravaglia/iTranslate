import { GET_TRACKS } from "../../../actionTypes";
import SpotifyAPI from "../../../SpotifyAPI";



////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getTracks(albumID) {

  return async function(dispatch) {
    // let albumsError = false;
    
    const handleAlbumClick = async (albumID) => {
      const response = await SpotifyAPI.getTracks(albumID);
      console.log("here are the tracks", response);
      return response;
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
