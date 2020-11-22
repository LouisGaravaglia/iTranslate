import { GET_ALBUMS, UPDATE_GENERAL_ERROR } from "../../../actionTypes";
import BackendCall from "../../../BackendCall";

////////////////////////////////// GET ALL POSTS //////////////////////////////////
export function getAlbums(artistId) {

  return async function(dispatch) {

    try { 
      let albums = await BackendCall.getAlbums({artistId});
      console.log("here are the alubms", albums); 
      dispatch(addAlbums(albums));
    } catch(e) {
      dispatch(updateGeneralError(true));
    };
  };
};

function addAlbums(albums) {
  return {type:GET_ALBUMS, albums};
};

function updateGeneralError(generalError) {
  return {type: UPDATE_GENERAL_ERROR, generalError};
};



// export function getAlbums(artistId) {

//   return async function(dispatch) {
//     // let albumsError = false;
    
//     try {
//       console.log("artistId: ", artistId);
//       const albums = await SpotifyAPI.getAlbums(artistId);
//       console.log("here are the alubms", albums); 

//       const newAlbumsArray = [];
     

//       //Loop over albums array and make new array with consolidated objects
//       for (let album of albums) {

//         let inDatabase = await BackendCall.checkIfAlbumIsInDB({albumId: album.id});

//         newAlbumsArray.push({
//           spotify_id: album.id, 
//           name: album.name, 
//           img: album.images[1].url,
//           inDatabase
//           })
//       }
//        console.log("here are the new albums", newAlbumsArray);

//       dispatch(addAlbums(newAlbumsArray));

//     } catch(e) {
//       dispatch(addAlbums(""));
//     }

 
    
   
    
//     // dispatch(updateArtistErrors(albumsError))
//   };
// }