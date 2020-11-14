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

//////////////////////////////////////  SONG DATA METHODS  //////////////////////////////////////

    static async addTrack(data) {
      console.log("Track data: ", data);
      if ( data.preview_url === null ) data.preview_url = "";
      let res = await this.request("track", data, "post");
      return res.data.response;
    }


    static async addArtist(data) {
      const filtered = data.img_url.map(item => item.url);
      data.genre = data.genre.join(",");
      data.img_url = filtered.join(",");
      console.log("Artist data: ", data);
      let res = await this.request("artist", data, "post");
      return res.data.response;
    }


    static async addAlbum(data) {
      data.img_url = data.img_url.url;
      console.log("ALBUM DATA: ", data);
      let res = await this.request("album", data, "post");
      return res.data.response;
    }

    static async addDiscography(data) {
      console.log("DISCOGRAPHY DATA: ", data);
      let res = await this.request("discography", data, "post");
      return res;
    }

    // ADDING TRACK ARTIST AND ALBUM DATA TO THE DB
    static async addTrackArtistAlbum(trackData, artistData, albumData) {

      try {

        const trackId = await this.addTrack(trackData);

        if (trackId === "This song already exists in DB") {
          return "No data was added to the DB"
        }

        const artistId = await this.addArtist(artistData);
        const albumId = await this.addAlbum(albumData);
        const spotifyIds = {trackId, artistId, albumId};
        console.log("Here is the artistId: ", artistId);
        //DO I NEED TO RETURN ANYTHING FORM ADDISCOGRPAHY?
        this.addDiscography(spotifyIds);
        console.log("Sucessfully added all three things to Disography.");
        return "Added new data to the DB";

      } catch ( err ) {

        console.log("FLASH MESSAGE: PLEASE TRY DIFFERENT SONG.", err);

      }
    }

//////////////////////////////////////  LYRICS METHODS  //////////////////////////////////////

    static async addLyrics(data) {
      let res = await this.request("lyrics", data, "post");
      console.log("addLyrics res: ", res);
      return res.data.response;
    }

    static async getLyrics(data) {
      console.log("This is data that im sending to getLyrics route: ", data);
      let res = await this.request("lyrics", data);
      console.log("getLyrics res: ", res);
      return res.data.response;
    }

//////////////////////////////////////  TRANSLATION METHODS  //////////////////////////////////////


  }

  export default BackendCall;