import axios from "axios";

class IBMWatsonAPI {

  static async getTranslationFromAPI(lyrics, language) {
    try {
      const res = await axios({
          method: "get",
          url: `http://localhost:3001/ibm/translate`,
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
          url: `http://localhost:3001/ibm/languages`
      });
      const responseObj = JSON.parse(res.data);
      return responseObj.response.result.languages;
    } catch(e) {
    };
  };
};

  export default IBMWatsonAPI;