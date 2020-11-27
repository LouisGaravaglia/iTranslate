import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class IBMWatsonAPI {

  static async getTranslationFromAPI(lyrics, language) {
    try {
      const res = await axios({
          method: "get",
          url: `${BASE_URL}/ibm/translate`,
          params: {lyrics, language},
      });
      const responseObj = JSON.parse(res.data);
      return responseObj.response;
    } catch(err) {
      return "Error attempting to read source text"
    };
  };

  static async getLanguages() {
    try {
      const res = await axios({
          method: "get",
          url: `${BASE_URL}/ibm/languages`
      });
      const responseObj = JSON.parse(res.data);
      return responseObj.response.result.languages;
    } catch(e) {
    };
  };
};

  export default IBMWatsonAPI;