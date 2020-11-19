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

  static async getTracks(albumId) {
    const accessToken = await requestAccessToken();

    try {

      const albumData = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/albums/${albumId}/tracks`,
        headers: {'Authorization': `Bearer ${accessToken}`}
      });

      const tracks = albumData.data.items;

      return [tracks, albumId];

    } catch(err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

/////////////////////////////////  GET SEED DATA FOR ARTISTS  /////////////////////////////////

  static async getTrackArtistAlbumData(trackId, artistId, albumId) {
    const accessToken = await requestAccessToken();

    try {

      const artistDetails = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/artists/${artistId}`,
        headers: {'Authorization': `Bearer ${accessToken}`}
      });
      const songAnalysis = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/audio-features/${trackId}`,
        headers: {'Authorization': `Bearer ${accessToken}`}
      });
      const trackDetails = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/tracks/${trackId}`,
        headers: {'Authorization': `Bearer ${accessToken}`}
      });
      const albumDetails = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/albums/${albumId}`,
        headers: {'Authorization': `Bearer ${accessToken}`}
      });

      console.log("Here are album tracks: ", artistDetails);
      console.log("Here is the song anaylsis: ", songAnalysis);
      console.log("Here is the track details: ", trackDetails);
      console.log("Here is the album details: ", albumDetails);
        
      const trackData = {spotify_id: trackId};
      const artistData = {spotify_id: artistId};
      const albumData = {spotify_id: albumId};

      albumData["name"] = albumDetails.data.name;
      albumData["release_date"] = albumDetails.data.release_date;
      albumData["spotify_uri"] = albumDetails.data.uri;
      albumData["img_url"] = albumDetails.data.images[1].url;
      albumData["artist_id"] = artistId;

      trackData["name"] = trackDetails.data.name;
      trackData["spotify_uri"] = trackDetails.data.uri;
      trackData["explicit"] = trackDetails.data.explicit;
      trackData["popularity"] = trackDetails.data.popularity;
      trackData["preview_url"] = trackDetails.data.preview_url;
      trackData["danceability"] = songAnalysis.data.danceability;
      trackData["tempo"] = songAnalysis.data.tempo;
      trackData["valence"] = songAnalysis.data.valence;
      trackData["duration"] = songAnalysis.data.duration_ms;
      trackData["artist_id"] = artistId;
      trackData["album_id"] = albumId;

      artistData["name"] = artistDetails.data.name;
      artistData["spotify_uri"] = artistDetails.data.uri;
      artistData["genre"] = artistDetails.data.genres.join(",");
      artistData["img_url"] = artistDetails.data.images[1].url;
      artistData["popularity"] = artistDetails.data.popularity;

      return [trackData, artistData, albumData];

    } catch(err) {
      console.error("API Error:", err.response);
    }
  }

  static async getNewAlbums() {
    const accessToken = await requestAccessToken();

    try {


      const newAlbums = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/browse/new-releases?limit=50`,
        headers: {'Authorization': `Bearer ${accessToken}`}
      });

    console.log("newAlbums: ", newAlbums);

    } catch(err) {
      console.error("API Error:", err.response);

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