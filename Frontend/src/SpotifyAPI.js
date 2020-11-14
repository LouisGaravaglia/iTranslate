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

        if (res.data.tracks.items[0]) {
          return res.data.tracks.items;
        } else {
          return "Not Found";
        }

      } catch(err) {
        console.error("SPOTIFY API Error:", err.response);
        return "Not Found";
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
 
/////////////////////////////////  GET SEED DATA FOR ARTISTS  /////////////////////////////////

static async getSongArtistAnalysis(trackData, artistData) {
      const accessToken = await requestAccessToken();

      try {

        const artistDetails = await axios({
          method: "get",
          url: `https://api.spotify.com/v1/artists/${artistData.spotify_id}`,
          headers: {'Authorization': `Bearer ${accessToken}`}
        });
        const songAnalysis = await axios({
          method: "get",
          url: `https://api.spotify.com/v1/audio-features/${trackData.spotify_id}`,
          headers: {'Authorization': `Bearer ${accessToken}`}
        });

          console.log("Here are album tracks: ", artistDetails);
          console.log("Here is the song anaylsis: ", songAnalysis);
          trackData["danceability"] = songAnalysis.data.danceability;
          trackData["tempo"] = songAnalysis.data.tempo;
          trackData["valence"] = songAnalysis.data.valence;
          trackData["duration"] = songAnalysis.data.duration_ms;
          artistData["genre"] = artistDetails.data.genres;
          artistData["img_url"] = artistDetails.data.images;
          artistData["popularity"] = artistDetails.data.popularity;
          return [trackData, artistData];

      } catch(err) {
        console.error("API Error:", err.response);
        trackData = "Error getting Track Data"
        return [trackData, artistData];
      }
    }

  }

  export default SpotifyAPI;


        // const songData = await axios({
        //   method: "get",
        //   url: `https://api.spotify.com/v1/tracks/${trackId}`,
        //   headers: {'Authorization': `Bearer ${accessToken}`}
        // });
        // const allArtistAlbums = await axios({
        //   method: "get",
        //   url: `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`,
        //   headers: {'Authorization': `Bearer ${accessToken}`}
        // });
        // const artistTopTracks = await axios({
        //   method: "get",
        //   url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
        //   headers: {'Authorization': `Bearer ${accessToken}`}
        // });
          // return res.data.tracks.items;
          // const base = res.data.tracks.items[0];
          // const trackData = { spotify_id: base.id, name: base.name, explicit: base.explicit, popularity: base.popularity, preview_url: base.preview_url  };
          // const artistData = { spotify_id: base.artists[0].id, name: base.artists[0].name, spotify_uri: base.artists[0].uri };
          // const albumData = { spotify_id: base.album.id, name: base.album.name, release_date: base.album.release_date, spotify_uri: base.album.uri, img_url: base.album.images[1] };
          // const artist = res.data.tracks.items[0].artists[0].name;
          // const album = res.data.tracks.items[0].album.name;
          // const albumID = res.data.tracks.items[0].album.id;
          // const track = res.data.tracks.items[0].name;
          // const image = res.data.tracks.items[0].album.images[0].url;
          // console.log("this is search request ARTISTS: ", artist);
          // console.log("this is search request ALBUM: ", album);
          // console.log("this is search request TRACK: ", track);
          // console.log("this is search request IMAGE: ", image);
        // const albumDetails = await axios({
        //   method: "get",
        //   url: `https://api.spotify.com/v1/albums/${albumId}/tracks`,
        //   headers: {'Authorization': `Bearer ${accessToken}`}
        // });