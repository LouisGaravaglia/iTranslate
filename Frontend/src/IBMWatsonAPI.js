import axios from "axios";

class IBMWatsonAPI {


  static async getTranslation(lyrics, language) {
    try {
      const res = await axios({
          method: "get",
          url: `http://localhost:3001/ibm/translate`,
          params: {lyrics, language},
      });
      const responseObj = JSON.parse(res.data);
      console.log("TRANSLATED LYRICS: ", responseObj.response);
      return responseObj.response;

    } catch(err) {
      console.log("API Error:", err);
    }
  }

  static async getLanguages() {
    try {
      const res = await axios({
          method: "get",
          url: `http://localhost:3001/ibm/languages`
      });
      const responseObj = JSON.parse(res.data);
      console.log("LANGUAGES: ", responseObj);
      return responseObj.response.result.languages;

    } catch(err) {
      console.log("API Error:", err);
    }
  }

}

  export default IBMWatsonAPI;