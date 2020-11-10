import axios from "axios";

class IBMWatsonAPI {


    static async getTranslation(lyrics) {

      try {
        console.log("ATTEMPTING TO GET TRANSLATION!!!");

     const res = await axios({
        method: "get",
        url: `http://localhost:3001/translate`,
        params: {lyrics},
     });
      
      // console.log("THE TRANSLATION1: ", JSON.parse(res.result.translations[0].translation));
      console.log("THE TRANSLATION2: ", res);
      
        
      } catch(err) {
        console.log("API Error:", err);
  
      }
    }
 
  }

  export default IBMWatsonAPI;