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

    

    static async addTrackArtistAlbum(trackData, artistData, albumData) {

      try {

        async function addArtist(data) {
          // const filteredImages = data.img_url.filter(obj => console.log(obj["url"]))
          // console.log("Im filtered img data: ", filteredImages);
          // data.img_url = filteredImages;
          const filtered = data.img_url.map(item => item.url);
          data.genre = data.genre.join(",");
          data.img_url = filtered.join(",");

          console.log("Artist data: ", data);
          let res = await this.request("artist", data, "post");
          console.log("I'M ADDING ARTIST: ", res);
          return res.artistId;
        }

        async function addTrack(data) {
          console.log("Trying to change all data values to string: ", data);
          if ( data.preview_url === null ) data.preview_url = "";
          let res = await this.request("track", data, "post");
          console.log("I'M ADDING TRACK: ", res);
          return res.trackId;
        }

        async function addAlbum(data) {
          data.img_url = data.img_url.url;
          console.log("ALBUM DATA: ", data);
          let res = await this.request("album", data, "post");
          console.log("I'M ADDING ALBUM: ", res);
          return res.albumId;
        }

        const trackId = await addTrack(trackData);
        const artistId = await addArtist(artistData);
        const albumId = await addAlbum(albumData);

      } catch ( err ) {
        next ( err );
      }
     

    }
  
    

    // static async getCompany(handle) {
    //   let res = await this.request(`companies/${handle}`);
    //   return res.company;
    // }

    // static async getJobs(search) {
    //   let res = await this.request("jobs", { search });
    //   console.log("geJob: ", res);
    // return res.jobs;
    // }

    // static async registerUser(data) {
    //   let res = await this.request("users", data, "post");
    //   console.log("REGISTER USER RESPONSE", res);
    // return res.token;
    // }

    // static async loginUser(data) {
    //   let res = await this.request("login", data, "post");
    //   console.log("LOGIN USER RESPONSE", res);
    // return res.token;
    // }

    // static async getCurrentUser(username) {
    //   let res = await this.request(`users/${username}`);
    //   console.log("GOT CURRENT USER RESPONSE", res);
    // return res.user;
    // }

    // static async updateUser(username, data) {
    //   let res = await this.request(`users/${username}`, data, "patch");
    //   console.log("updateUser RESPONSE", res);
    // return res.user;
    // }

    // static async applyToJob(id) {
    //   let res = await this.request(`jobs/${id}/apply`, {}, "post");
    //   console.log("made a call to applyToJob", res);
    // return res.message;
    // }

    
  }

  export default BackendCall;