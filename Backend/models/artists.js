const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
// const sqlForPartialUpdate = require("../helpers/partialUpdate");

class Artists {

  static async add ( data ) {
    const duplicateCheck = await db.query (
      `SELECT spotify_id FROM artists WHERE spotify_id = $1`, [ data.spotify_id ]
    );

    if ( duplicateCheck.rows.length ) {
      return data.spotify_id;
    };

    const result = await db.query (
      `INSERT INTO artists ( spotify_id, name, genre, spotify_uri, img_url, popularity )
      VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING spotify_id`, 
      [ data.spotify_id, data.name, data.genre, data.spotify_uri, data.img_url, data.popularity  ]
    );
    console.log("HERE IS THE ARTIST RESULT FROM BACKEND: ", result);
    return result.rows[0].spotify_id;

  }

  static async getArtistsAndIds() {
    const result = await db.query (`SELECT name, spotify_id FROM artists`);
    console.log("HERE IS THE getArtistsAndIds RESULT FROM BACKEND: ", result);
    return result.rows;
  }

  static async getGenres() {
        // const result = await db.query (`SELECT array_agg(genre) FROM artists GROUP BY genre ORDER BY genre DESC`);
    // const result = await db.query (`SELECT ARRAY(SELECT genre FROM artists ORDER BY genre)`);
    // const result = await db.query (`SELECT array_to_string(ARRAY(SELECT genre FROM artists ORDER BY genre DESC), ', ') AS genres`);
    // const result = await db.query (`SELECT array_to_string(array_agg(genre ORDER BY genre), ', ') FROM artists`);

    const result = await db.query (`SELECT array_to_string(ARRAY(SELECT genre FROM artists ORDER BY genre), ', ') AS genres`);
    console.log("HERE IS THE getGenres RESULT FROM BACKEND: ", result);
    return result.rows;
  }
}

module.exports = Artists;