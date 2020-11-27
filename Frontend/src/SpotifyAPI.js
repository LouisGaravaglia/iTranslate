import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class SpotifyAPI {

//////////////////////////////////////  REQUEST METHOD  //////////////////////////////////////

  static async request(endpoint, paramsOrData = {}, verb = "get") {
    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData}));
        // axios sends query string data via the "params" key,
        // and request body data via the "data" key,
        // so the key we need depends on the HTTP verb
    } catch(e) {
      console.log("Hit catch block in Spotify Request method");
      let message = e.response.data.message;
      throw Array.isArray(message) ? message : [message];
    };
  };

//////////////////////////////////////  SEARCH RESULTS  //////////////////////////////////////

  static async requestSearch(search) {

    try {
        console.log("entering requestSearch: ");
      let res = await this.request("spotify/requestSearch", {search});
      console.log("This is the res from requestSearch: ", res);
      return res.data.response;
    } catch(err) {
    };
  };

/////////////////////////////////  GET SEED DATA FOR ARTISTS  /////////////////////////////////

  static async getTrackArtistAlbumData(data) {

    try {
      console.log("This is data: ", data);
      let res = await this.request("spotify/getTrackArtistAlbumData", data);
            console.log("This is the res from getTrackArtistAlbumData: ", res);

      return res.data.response;
    } catch(err) {
      console.log("error in getTrackArtistAlbum", err);
    };
  };

};

export default SpotifyAPI;