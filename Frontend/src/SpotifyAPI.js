import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class SpotifyAPI {

//////////////////////////////////////  REQUEST METHOD  //////////////////////////////////////

  static async request(endpoint, paramsOrData = {}, verb = "get") {
    return (await axios({
      method: verb,
      url: `${BASE_URL}/${endpoint}`,
      [verb === "get" ? "params" : "data"]: paramsOrData}));
  };

//////////////////////////////////////  SEARCH RESULTS  //////////////////////////////////////

  static async requestSearch(search) {
    let res = await this.request("spotify/requestSearch", {search});
    return res.data.response;
  };

/////////////////////////////////  GET SEED DATA FOR ARTISTS  /////////////////////////////////

  static async getTrackArtistAlbumData(data) {
    let res = await this.request("spotify/getTrackArtistAlbumData", data);
    return res.data.response;
  };
};

export default SpotifyAPI;