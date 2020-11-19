const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
// const sqlForPartialUpdate = require("../helpers/partialUpdate");

class Tracks {

  static async getDanceabilityTracks(data) {
    console.log("INSIDE TRACKS.getDanceablityTracks METHOD", data);

    const result = await db.query (
      `SELECT name, spotify_id FROM tracks WHERE danceability >= $1 AND danceability <= $2`, [data.lowerLimit, data.upperLimit]);
    console.log("HERE IS THE RESULT", result);

    return result.rows;

  }

  static async getCheckmarkValue(trackId) {
    console.log("INSIDE TRACKS.getCheckmarkValue METHOD", trackId);

    const result = await db.query (
      `SELECT lyrics FROM tracks WHERE spotify_id = $1`, [trackId]);
    console.log("HERE IS THE RESULT", result);
    console.log("Here is the result of rows[0]", result.rows[0]);

    if (result.rows[0] === "No Lyrics") {
      return "red";
    } else {
      return "green";
    }

    return result.rows;

  }

  static async add ( data ) {
    console.log("INSIDE TRACKS.ADD METHOD", data);
    const duplicateCheck = await db.query (
      `SELECT spotify_id FROM tracks WHERE spotify_id = $1`, [ data.spotify_id ]
    );
    console.log("DUPLICATE CHECK: ", duplicateCheck);
    if ( duplicateCheck.rows.length ) {
      return "This song already exists in DB";
    };
      console.log("MY TRACK DATA: ", data);

    const result = await db.query (
      `INSERT INTO tracks ( spotify_id, name, explicit, popularity, preview_url, spotify_uri, danceability, tempo, valence, duration )
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) RETURNING spotify_id`, 
      [ data.spotify_id, data.name, data.explicit, data.popularity, data.preview_url, data.spotify_uri, data.danceability, data.tempo, data.valence, data.duration ]
    );
    console.log("HERE IS THE RESULT", result);

    return result.rows[0].spotify_id;

  }
}

module.exports = Tracks;