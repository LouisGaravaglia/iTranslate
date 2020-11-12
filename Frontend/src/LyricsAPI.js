import axios from "axios";

const SEARCH_URL = "https://api.lyrics.ovh/v1"

class LyricsAPI {

    static async getLyrics(artist, track) {
      console.log("ARTIST, then Track: ", artist, track);

      try {
        const res = await axios({
          method: "get",
          url: `${SEARCH_URL}/${artist}/${track}`,
        });
        console.log("this is lyric Search request: ", res);

        if (res.data.lyrics === "") {
          console.log("NO LYRICS");
          return "No Lyrics"
        } else {
          return res.data.lyrics;
        }

      } catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
 
  }

  export default LyricsAPI;