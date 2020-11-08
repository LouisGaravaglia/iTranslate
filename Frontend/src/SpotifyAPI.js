import axios from "axios";
import requestAccessToken from "./accessToken";

const SEARCH_URL = "https://api.spotify.com/v1/search?q="

class SpotifyAPI {

    static async requestSearch(artist, track) {
      const noSpacesArtist = artist.replace(" ", "%20");
      const noSpacesTrack = track.replace(" ", "%20");
      const accessToken = await requestAccessToken();
      console.log("requestSearch:", noSpacesArtist, noSpacesTrack, accessToken);

      try {
        const res = await axios({
          method: "get",
          url: `${SEARCH_URL}/${noSpacesArtist}%20${noSpacesTrack}&type=track`,
          headers: {'Authorization': `Bearer ${accessToken}`}
        });
    
        console.log("this is search request: ", res);
        if (res.data.tracks.items[0]) {
          const artist = res.data.tracks.items[0].artists[0].name;
          const album = res.data.tracks.items[0].album.name;
          const track = res.data.tracks.items[0].name;
          const image = res.data.tracks.items[0].album.images[0].url;
          console.log("this is search request ARTISTS: ", artist);
          console.log("this is search request ALBUM: ", album);
          console.log("this is search request TRACK: ", track);
          return [artist, album, track, image];
        } else {
          const artist = "Not Found";
          const album = "Not Found";
          const track = "Not Found";
          return [artist, album, track];
        }
        
      } catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
 
  }

  export default SpotifyAPI;