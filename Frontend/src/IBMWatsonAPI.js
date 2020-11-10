import axios from "axios";

class IBMWatsonAPI {


    static async getTranslation(lyrics) {

      try {
     

     const res = await axios({
        method: "get",
        url: `http://localhost:3001/translate`,
        params: {lyrics},
     });
      

      const responseObj = JSON.parse(res.data);
      console.log("TRANSLATED LYRICS: ", responseObj.response);
      return responseObj.response;
        
      } catch(err) {
        console.log("API Error:", err);
  
      }
    }
 
  }

  export default IBMWatsonAPI;