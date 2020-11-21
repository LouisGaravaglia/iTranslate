import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BackendCall {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
      // paramsOrData._token = localStorage.getItem("jobly-token");
  
      console.debug("API Call:", endpoint, paramsOrData, verb);
  
      try {
        return (await axios({
          method: verb,
          url: `${BASE_URL}/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData}));
          // axios sends query string data via the "params" key,
          // and request body data via the "data" key,
          // so the key we need depends on the HTTP verb
      }
  
      catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }

//////////////////////////////////////  ADD SONG DATA METHODS  //////////////////////////////////////

    static async addTrack(data) {
      console.log("Track data: ", data);
      if ( data.preview_url === null ) data.preview_url = "";
      let res = await this.request("track", data, "post");
      return res.data.response;
    }

    static async addArtist(data) {
      console.log("Artist data: ", data);
      let res = await this.request("artist", data, "post");
      return res.data.response;
    }

    static async addAlbum(data) {
      console.log("ALBUM DATA: ", data);
      let res = await this.request("album", data, "post");
      return res.data.response;
    }

    // CALLS METHODS ABOVE TO ADD TRACK ARTIST AND ALBUM DATA TO THE DB
    static async addTrackArtistAlbum(trackData, artistData, albumData) {

      try {
        const artistId = await this.addArtist(artistData);
        const albumId = await this.addAlbum(albumData);
        const trackId = await this.addTrack(trackData);
        console.log("Here is the artistId: ", artistId);
        console.log("Sucessfully added all three things to Database");

        if (trackId === "This song already exists in DB") {
          return "No data was added to the DB"
        }

 

        return "Added new track to the DB";

      } catch ( err ) {
        //**********FLASH MESSAGE ASKING TO PICK DIFFERENT SONG */
        console.log("FLASH MESSAGE: PLEASE TRY DIFFERENT SONG.", err);
      }
    }

//////////////////////////////////////  GET hasLyrics AND inDatabase VALUE //////////////////////////////////////

    static async checkIfTrackHasLyrics(data) {
      let res = await this.request("track/hasLyrics", data);
      console.log("checkIfTrackHasLyrics res: ", res);
      return res.data.response;
    }

    static async checkIfTrackIsInDB(data) {
      let res = await this.request("track/inDatabase", data);
      console.log("checkIfTrackIsInDB res: ", res);
      return res.data.response;
    }

    static async checkIfAlbumIsInDB(data) {
      let res = await this.request("album", data);
      console.log("checkIfTrackIsInDB res: ", res);
      return res.data.response;
    }

//////////////////////////////////////  GET/ADD LYRICS  //////////////////////////////////////

    static async addLyrics(data) {
      let res = await this.request("track", data, "patch");
      console.log("addLyrics res: ", res);
      return res.data.response;
    }

    static async getLyrics(data) {
      console.log("This is data that im sending to track/getLyrics route: ", data);
      let res = await this.request("track/getLyrics", data);
      console.log("getLyrics res: ", res);
      return res.data.response;
    }

//////////////////////////////////////  GET/ADD TRANSLATION  //////////////////////////////////////

    static async getTranslation(data) {
      console.log("This is data that im sending to getTranslation route: ", data);
      let res = await this.request("translation", data);
      console.log("getTranslation res: ", res);
      return res.data.response;
    }

    static async addTranslation(data) {
      console.log("This is data that im sending to postTranslation route: ", data);
      let res = await this.request("translation", data, "post");
      console.log("postTranslation res: ", res);
      return res.data.response;
    }

//////////////////////////////////////  GET ARTISTS/IDS  //////////////////////////////////////

    static async getArtistsAndArtistIds() {
      console.log("madking getArtistsandIDS request");
      let res = await this.request("artist/ids");
      console.log("getArtistsandIDS res: ", res);
      return res.data.response;
    }

//////////////////////////////////////  GET GENRES / GET ARTISTS FROM SPECIFIC GENRE  //////////////////////////////////////

    static async getGenres() {
      console.log("making getGenres request");
      let res = await this.request("artist/allGenres");
      console.log("getGenres res: ", res);
      return res.data.response;
    }

    static async getArtistByGenre(data) {
      console.log("making getArtistByGenre request");
      let res = await this.request("artist/byGenre", data);
      console.log("getArtistByGenre res: ", res);
      return res.data.response;
    }

//////////////////////////////////////  GET DANCEABILITY  //////////////////////////////////////

    static async getDanceabilityTracks(data) {
      console.log("making getDanceabilityTracks request");
      let res = await this.request("track/danceability", data);
      console.log("getDanceabilityTracks res: ", res);
      return res.data.response;
    }

//////////////////////////////////////  GET DANCEABILITY  //////////////////////////////////////

    static async getAlbums(data) {
      console.log("making getAlbums request");
      let res = await this.request("album", data);
      console.log("getAlbums res: ", res);
      return res.data.response;
    }
  }

  export default BackendCall;