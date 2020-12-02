const axios = require("axios");
const SEARCH_URL = "https://api.lyrics.ovh/v1"

class LyricsAPI {

  /**
  * Converts input value into a string value formatted to be appended to 
  * the Spotify API search endpoint. This will return an array of up to 
  * 20 music objects that most fit the search value submitted.
  * @param {string} search - input value that user types into search for song field
  */
  static async getLyrics(artist, track) {
    console.log("Inside getLyrics, this is artist: ", artist);
        console.log("Inside getLyrics, this is track: ", track);

      try {
        const res = await axios({
          method: "get",
          url: `${SEARCH_URL}/${artist}/${track}`,
        });
        console.log("this is the res: ", res);

        if (res.data.lyrics === "") {
          return "No Lyrics from API";
        } else {
          return res.data.lyrics;
        };
      } catch(e) {
        console.log("This is the error: ", e);
        return "No Lyrics from API";
      };
    };
};

module.exports = LyricsAPI;