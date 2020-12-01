import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BackendCall {

//////////////////////////////////////  REQUEST METHOD  //////////////////////////////////////

  static async request(endpoint, paramsOrData = {}, verb = "get") {
    return (await axios({
      method: verb,
      url: `${BASE_URL}/${endpoint}`,
      [verb === "get" ? "params" : "data"]: paramsOrData}));
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
  };

//////////////////////////////////////  ADD SONG DATA  //////////////////////////////////////

  static async addTrack(data) {
    if ( data.preview_url === null ) data.preview_url = "";
    let res = await this.request("track", data, "post");
    return res.data.response;
  };

  static async addArtist(data) {
    let res = await this.request("artist", data, "post");
    return res.data.response;
  };

  static async addAlbum(data) {
    let res = await this.request("album", data, "post");
    return res.data.response;
  };

  /**
  * Adds Track, Artist, and Album data by calling the above three methods,
  * which in then make separate requests to their respective routes
  * adding to the database.
  * @param {object} trackData - holds an object of data used within the components
  * @param {object} artistData - object where the values are strings used to fire certain actions
  * @param {object} albumData - object where the values are strings used to fire certain actions  
  */
  static async addTrackArtistAlbum(trackData, artistData, albumData) {
    await this.addArtist(artistData);
    await this.addAlbum(albumData);
    const trackId = await this.addTrack(trackData);

    if (trackId === "This song already exists in DB") {
      return "No data was added to the DB";
    };

    return "Added new track to the DB";
  };

//////////////////////////////////////  CHECK AGAINST BACKEND FOR VARIOUS CONCNERS //////////////////////////////////////

  static async checkIfTrackHasLyrics(data) {
    let res = await this.request("track/hasLyrics", data);
    return res.data.response;
  };

  static async checkIfTrackIsInDB(data) {
    let res = await this.request("track/inDatabase", data);
    return res.data.response;
  };

  static async checkIfAlbumIsInDB(data) {
    let res = await this.request("album", data);
    return res.data.response;
  };

//////////////////////////////////////  GET/ADD LYRICS  //////////////////////////////////////

  static async addLyrics(data) {
    let res = await this.request("track", data, "patch");
    return res.data.response;
  };

  static async getLyrics(data) {
    let res = await this.request("track/getLyrics", data);
    return res.data.response;
  };

//////////////////////////////////////  GET/ADD TRANSLATION  //////////////////////////////////////

  static async getTranslationFromDB(data) {
    let res = await this.request("translation", data);
    return res.data.response;
  };

  static async addTranslation(data) {
    let res = await this.request("translation", data, "post");
    return res.data.response;
  };

//////////////////////////////////////  GET ARTISTS/IDS  //////////////////////////////////////

  static async getArtistsAndArtistIds() {
    let res = await this.request("artist/ids");
    return res.data.response;
  };

//////////////////////////////////////  GET GENRES / GET ARTISTS FROM SPECIFIC GENRE  //////////////////////////////////////

  static async getGenres() {
    let res = await this.request("artist/allGenres");
    return res.data.response;
  };

  static async getArtistByGenre(data) {
    let res = await this.request("artist/byGenre", data);
    return res.data.response;
  };

//////////////////////////////////////  GET DANCEABILITY  //////////////////////////////////////

  static async getDanceabilityTracks(data) {
    let res = await this.request("track/danceability", data);
    return res.data.response;
  };

//////////////////////////////////////  GET ALBUMS  //////////////////////////////////////

  static async getAlbums(data) {
    let res = await this.request("album", data);
    return res.data.response;
  };

//////////////////////////////////////  GET ALBUMS  //////////////////////////////////////

  static async getTracks(data) {
    let res = await this.request("track/getTracks", data);
    return res.data.response;
  };

//////////////////////////////////////  GET SELECTED SEARCH RESULT DB INFO  //////////////////////////////////////

  /**
  * A function that restructures the object given in the argument
  * to have the a consistent pattern, and remove any uncessary information,
  * as well as add boolean values as to whether that track has lyrics or is
  * already in the database by making two separate backend calls.
  * @param {object} track - holds an object of Spotify data for a given track
  */
  static async consolidateSelectedSearchResultInfo(track) {
    const selectedTrack = {};
    let hasLyrics = await BackendCall.checkIfTrackHasLyrics({trackId: track.id});
    let inDatabase = await BackendCall.checkIfTrackIsInDB({trackId: track.id});

    selectedTrack["trackId"] = track.id;
    selectedTrack["trackName"] = track.name;
    selectedTrack["artistId"] = track.artists[0].id;
    selectedTrack["artistName"] = track.artists[0].name;
    selectedTrack["albumId"] = track.album.id;
    selectedTrack["albumName"] = track.album.name;
    selectedTrack["hasLyrics"] = hasLyrics;
    selectedTrack["inDatabase"] = inDatabase;

    return selectedTrack;
  };
};

export default BackendCall;