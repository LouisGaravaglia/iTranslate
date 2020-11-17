import axios from "axios";

class IBMWatsonAPI {


  static async getTranslation(lyrics, language) {
          console.log("Here is the language im getting form state: ", language);
      console.log("Here are the lyrics that im getting from state:");
      console.log(lyrics);

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
      return "Error attempting to read source text"
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