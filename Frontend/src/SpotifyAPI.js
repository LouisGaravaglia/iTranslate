import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class SpotifyAPI {

//////////////////////////////////////  REQUEST METHOD  //////////////////////////////////////

  static async request(endpoint, paramsOrData = {}, verb = "get") {
    try {
      console.log("This is BASE_URL", BASE_URL);
      console.log("This is process.env.REACT_APP_BASE_URL", process.env.REACT_APP_BASE_URL);
      console.log("This is process.env.REACT_APP", process.env.REACT_APP);
      return (await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData}));
        // axios sends query string data via the "params" key,
        // and request body data via the "data" key,
        // so the key we need depends on the HTTP verb
    } catch(e) {
    };
  };

//////////////////////////////////////  SEARCH RESULTS  //////////////////////////////////////

  static async requestSearch(search) {

    try {
      let res = await this.request("spotify/requestSearch", {search});
      return res.data.response;
    } catch(err) {
    };
  };

/////////////////////////////////  GET SEED DATA FOR ARTISTS  /////////////////////////////////

  static async getTrackArtistAlbumData(data) {

    try {
      let res = await this.request("spotify/getTrackArtistAlbumData", data);
      return res.data.response;
    } catch(err) {
    };
  };

};

export default SpotifyAPI;