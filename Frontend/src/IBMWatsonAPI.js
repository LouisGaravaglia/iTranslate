import axios from "axios";
import {IBM_API_KEY} from "./secrets";

const TRANSLATION_URL = "https://api.us-south.language-translator.watson.cloud.ibm.com/instances/50168c0d-7f7a-4c78-8324-c556bbf32d4f/v3/translate?version=2018-05-01";

class IBMWatsonAPI {

// TEMPLATE
//   curl -X POST --user "apikey:{apikey}" \
// --header "Content-Type: application/json" \
// --data '{"text": ["Hello, world.", "How are you?"], "model_id":"en-es"}' \
// "{url}/v3/translate?version=2018-05-01"

// V1
//      const res = await axios({
//           method: "post",
//           url: TRANSLATION_URL,
//           headers: {'Content-Type': 'application/json'},
//           user: {'apikey':IBM_API_KEY},
//           data: {'text':[lyrics], "model_id":"es-en"}
//         });
// const res = await axios({
//   method: "post",
//   url: TRANSLATION_URL,
//   headers: {'Content-Type': 'application/json'},
//   user: {'apikey':IBM_API_KEY},
//   data: {'text':[lyrics], "model_id":"es-en"}
// });

// v2
//     const config = {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//         const params = {
//           user: {
//             'apikey':IBM_API_KEY,
//             'text':[lyrics], 'model_id':'es-en'
//           }
//         }
//         const res = await axios.post(TRANSLATION_URL, params, config);

// v3
//         const header = {
//           header: {
//             'Content-Type': 'application/json'
//           }
//         }
//         const data = {
//           data: {
//             text:[lyrics], 'model_id':'es-en'
//           }
//         }
//         const user = {
//           user: {
//             apikey:IBM_API_KEY
//           }
//         }
//         const res = await axios.post(TRANSLATION_URL, data, user, header);

// v4
//         var headers = {
//             'Content-Type': 'application/json'
//         };
//         var dataString = '{"text": ["Hello, world.", "How are you?"], "model_id":"en-es"}';
//         const res = await axios({
//           url: TRANSLATION_URL,
//           method: 'POST',
//           headers: headers,
//           body: dataString,
//           auth: {
//               'apikey': IBM_API_KEY
//           }
//         });

// v5
//      const res = await axios({
//           method: "post",
//           url: TRANSLATION_URL,
//           headers: {'Content-Type': 'application/json'},
//           params: {user: {'apikey':IBM_API_KEY}},
//           data: {'text':["hola amigo"], "model_id":"es-en"}
//         });


    static async getTranslation(lyrics) {

      try {
        console.log("ATTEMPTING TO GET TRANSLATION!!!");
     const res = await axios({
          method: "post",
          url: TRANSLATION_URL,
          headers: {'Content-Type': 'application/json'},
          params: {user: {'apikey':IBM_API_KEY}},
          data: {'text':["hola amigo"], "model_id":"es-en"}
        });

        console.log("this is lyric translation request: ", res);
        // if (res.data.tracks.items[0]) {
        //   const artist = res.data.tracks.items[0].artists[0].name;
        //   const album = res.data.tracks.items[0].album.name;
        //   const track = res.data.tracks.items[0].name;
        //   const image = res.data.tracks.items[0].album.images[0].url;
        //   console.log("this is search request ARTISTS: ", artist);
        //   console.log("this is search request ALBUM: ", album);
        //   console.log("this is search request TRACK: ", track);
        //   return [artist, album, track, image];
        // } else {
        //   const artist = "Not Found";
        //   const album = "Not Found";
        //   const track = "Not Found";
        //   return [artist, album, track];
        // }
        
      } catch(err) {
        console.log("API Error:", err);
        // let message = err.response.data.message;
        // throw Array.isArray(message) ? message : [message];
      }
    }
 
  }

  export default IBMWatsonAPI;