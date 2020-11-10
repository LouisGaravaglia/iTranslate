import axios from "axios";
import requestAccessToken from "./accessToken";

const SEARCH_URL = "https://api.spotify.com/v1/search?q="

class SpotifyAPI {

    static async requestSearch(search) {
      const minifiedSearchVal = search.replace(" ", "%20");
      const accessToken = await requestAccessToken();

      try {
        const res = await axios({
          method: "get",
          url: `${SEARCH_URL}/${minifiedSearchVal}&type=track`,
          headers: {'Authorization': `Bearer ${accessToken}`}
        });
    
        console.log("this is search request: ", res);
 
        if (res.data.tracks.items[0]) {
          return res.data.tracks.items;
          // const artist = res.data.tracks.items[0].artists[0].name;
          // const album = res.data.tracks.items[0].album.name;
          // const albumID = res.data.tracks.items[0].album.id;
          // const track = res.data.tracks.items[0].name;
          // const image = res.data.tracks.items[0].album.images[0].url;
          // console.log("this is search request ARTISTS: ", artist);
          // console.log("this is search request ALBUM: ", album);
          // console.log("this is search request TRACK: ", track);
          // console.log("this is search request IMAGE: ", image);
        // const albumData = await axios({
        //   method: "get",
        //   url: `https://api.spotify.com/v1/albums/${albumID}/tracks`,
        //   headers: {'Authorization': `Bearer ${accessToken}`}
        // });
        // const songAnalysis = await axios({
        //   method: "get",
        //   url: `https://api.spotify.com/v1/audio-features/6Rw0bs1kO0KbTGAXnAQ6UJ`,
        //   headers: {'Authorization': `Bearer ${accessToken}`}
        // });
        // const songData = await axios({
        //   method: "get",
        //   url: `https://api.spotify.com/v1/tracks/6Rw0bs1kO0KbTGAXnAQ6UJ`,
        //   headers: {'Authorization': `Bearer ${accessToken}`}
        // });
        // const allArtistAlbums = await axios({
        //   method: "get",
        //   url: `https://api.spotify.com/v1/artists/1vyhD5VmyZ7KMfW5gqLgo5/albums?include_groups=album`,
        //   headers: {'Authorization': `Bearer ${accessToken}`}
        // });
        // const artistTopTracks = await axios({
        //   method: "get",
        //   url: `https://api.spotify.com/v1/artists/1vyhD5VmyZ7KMfW5gqLgo5/top-tracks?country=US`,
        //   headers: {'Authorization': `Bearer ${accessToken}`}
        // });
          // console.log("Here are album tracks: ", albumData);
          // console.log("Here is the song anaylsis: ", songAnalysis);
          // console.log("Here is the song data: ", songData);
          // console.log("Here are all the albums by J Balvin: ", allArtistAlbums);
          // console.log("Here are all the artists top tracks: ", artistTopTracks);
          // return [artist, album, track, image];
        } else {
          return "Not Found";
          // const artist = "Not Found";
          // const album = "Not Found";
          // const track = "Not Found";
          // return [artist, album, track];
        }
        
      } catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }

/////////////////////////////////  GET ARTIST ID  /////////////////////////////////

    static async getArtistId(artist) {
      const noSpacesArtist = artist.replace(" ", "%20");
      const accessToken = await requestAccessToken();
      try {

        const res = await axios({
          method: "get",
          url: `${SEARCH_URL}/${noSpacesArtist}&type=artist`,
          headers: {'Authorization': `Bearer ${accessToken}`}
        });

        if (res.data.artists.items[0]) {
          const artistID = res.data.artists.items[0].id;
          return artistID;
        } else {
          return "Artist ID not found";
        }
        
      } catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }

/////////////////////////////////  GET ALBUMS BY ARTIST /////////////////////////////////

    static async getAlbums(ID) {
      const accessToken = await requestAccessToken();

      try {

        const allArtistAlbums = await axios({
          method: "get",
          url: `https://api.spotify.com/v1/artists/${ID}/albums?include_groups=album`,
          headers: {'Authorization': `Bearer ${accessToken}`}
        });

        return allArtistAlbums.data.items;

      } catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }

/////////////////////////////////  GET TRACKS BY ALBUM  /////////////////////////////////

    static async getTracks(albumID) {
      const accessToken = await requestAccessToken();

      try {

        const albumData = await axios({
          method: "get",
          url: `https://api.spotify.com/v1/albums/${albumID}/tracks`,
          headers: {'Authorization': `Bearer ${accessToken}`}
        });

        return albumData.data.items;

      } catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
 
  }

  export default SpotifyAPI;