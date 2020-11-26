import axios from "axios";

const SEARCH_URL = "https://api.lyrics.ovh/v1"

class LyricsAPI {

    static async getLyrics(artist, track) {
      try {
        const res = await axios({
          method: "get",
          url: `${SEARCH_URL}/${artist}/${track}`,
        });

        if (res.data.lyrics === "") {
          return "No Lyrics from API";
        } else {
          return res.data.lyrics;
        };
      } catch(err) {
        return "No Lyrics from API";
      };
    };
  };

  export default LyricsAPI;