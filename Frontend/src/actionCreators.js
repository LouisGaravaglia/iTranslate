import axios from "axios";
import { GET_SPOTIFY_DATA } from "./actionTypes";
import SpotifyAPI from "./SpotifyAPI";

const SPOTIFY_URL = "https://api.spotify.com/v1/search?q="

// curl -X GET "https://api.spotify.com/v1/search?q=Maluma%20La%20Cura&type=artist,track,album" 
// -H "Authorization: Bearer BQC5Wiu-4J35XORh7Xkg-UDgZCNidX-VmAzMfvvCOmyPlVJW61LlLt7ePIXgGO5r-k6EVvgd7Qbk0gfQZ3g"

////////////////////////////////// GET ALL POSTS //////////////////////////////////

// function replaceSpaces(str) {
//   const noSpaces = str.replace(" ", "%20");
//   return noSpaces;
// }

// export function getData(artist, track) {
//     return async function(dispatch) {
//         const res = await axios.get(`${SPOTIFY_URL}${updatedArtist}%20${updatedTrack}&type=artist,track,album`);
//         dispatch(retrievePosts(res.data));
//     };
// }

// function retrievePosts(posts) {
//     return {type:GET_POSTS, posts};
// }