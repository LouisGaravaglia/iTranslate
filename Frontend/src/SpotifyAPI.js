import axios from "axios";
import requestAccessToken from "./accessToken";

const SEARCH_URL = "https://api.spotify.com/v1/search?q="

class SpotifyAPI {

  /**
  * Converts input value into a string value formatted to be appended to 
  * the Spotify API search endpoint. This will return an array of up to 
  * 20 music objects that most fit the search value submitted.
  * @param {string} search - input value that user types into search for song field
  */
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
      };
    } catch(err) {
      return "Not Found";
    };
  };

/////////////////////////////////  GET ARTIST ID  /////////////////////////////////

  /**
  * Makes a call to the Spotify API to get a the unique spotify id for
  * the artist passed as the argument.
  * @param {string} artist - artist name
  */
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
      };
    } catch(e) {
    };
  };

/////////////////////////////////  GET SEED DATA FOR ARTISTS  /////////////////////////////////

  /**
  * Pulls down more detailed data objects for the track, artist, and album
  * and we then parse that info and create our own objects for each
  * element containg the information we need.
  * @param {string} trackId - unique spotify id for that track
  * @param {string} artistId - unique spotify id for that artist
  * @param {string} albumId - unique spotify id for that album
  */
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
    } catch(e) {
    };
  };

};

export default SpotifyAPI;