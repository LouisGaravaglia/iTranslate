const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
// const sqlForPartialUpdate = require("../helpers/partialUpdate");

class Tracks {

  static async add ( data ) {
    console.log("INSIDE TRACKS.ADD METHOD", data);
    const duplicateCheck = await db.query (
      `SELECT spotify_id FROM tracks WHERE spotify_id = $1`, [ data.spotify_id ]
    );

    if ( duplicateCheck[0].rows ) {
      throw new ExpressError (
        `There already exists a track with spotify_id '${ data.spotify_id }`,
        400
      );
    };

    const result = await db.query (
      `INSERT INTO tracks ( spotify_id, name, explicit, popularity, preview_url, spotify_uri, danceability, tempo, valence, duration )
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) RETURNING spotify_id`, 
      [ data.spotify_id, data.name, data.explicit, data.popularity, data.preview_url, data.spotify_uri, data.danceablity, data.tempo, data.valence, data.duration ]
    );

    return result.rows[0];

  }
}

module.exports = Tracks;