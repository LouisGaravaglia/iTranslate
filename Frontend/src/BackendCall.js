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


    static async addTrack(data) {
      console.log("Track data: ", data);
      if ( data.preview_url === null ) data.preview_url = "";
      let res = await this.request("track", data, "post");
      console.log("I'M ADDING TRACK: ", res);
      return res.trackId;
    }


    static async addArtist(data) {
      const filtered = data.img_url.map(item => item.url);
      data.genre = data.genre.join(",");
      data.img_url = filtered.join(",");
      console.log("Artist data: ", data);
      let res = await this.request("artist", data, "post");
      return res.artistId;
    }


    static async addAlbum(data) {
      data.img_url = data.img_url.url;
      console.log("ALBUM DATA: ", data);
      let res = await this.request("album", data, "post");
      return res.albumId;
    }

    // ADDING TRACK ARTIST AND ALBUM DATA TO THE DB
    static async addTrackArtistAlbum(trackData, artistData, albumData) {

      try {

        const trackId = await this.addTrack(trackData);

        if (trackId === "This song already exists in DB") {
          return "No need to add data"
        }

        const artistId = await this.addArtist(artistData);
        const albumId = await this.addAlbum(albumData);
        console.log("Sucessfully added all three things.");
        return [trackId, artistId, albumId];

      } catch ( err ) {

        console.log("FLASH MESSAGE: PLEASE TRY DIFFERENT SONG.", err);

      }
    }


  }

  export default BackendCall;