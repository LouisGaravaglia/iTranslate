import { GET_ALBUMS } from "../../../actionTypes";
import SpotifyAPI from "../../../SpotifyAPI";



////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getAlbums(artistId) {

  return async function(dispatch) {
    const albumsError = false;
    
    const handleArtistClick = async (artistId) => {
      console.log("artistId: ", artistId);
      const response = await SpotifyAPI.getAlbums(artistId);
      console.log("here are the alubms", response); 
      return response;   
    }
    
    const albums = await handleArtistClick(artistId);
    
    dispatch(addAlbums(albums));
    // dispatch(updateArtistErrors(albumsError))
  };
}

function addAlbums(albums) {
  return {type:GET_ALBUMS, albums};
}

// function updateArtistErrors(albumsError) {
//   return {type: UPDATE_SEARCH_ERROR, albumsError}
// }
