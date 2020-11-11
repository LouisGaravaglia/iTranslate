const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
// const sqlForPartialUpdate = require("../helpers/partialUpdate");

class Artists {

  static async add ( data ) {
    const duplicateCheck = await db.query (
      `SELECT spotify_id FROM artists WHERE spotify_id = $1`, [ data.spotify_id ]
    );

    if ( duplicateCheck[0].rows ) {
      throw new ExpressError (
        `There already exists an artist with spotify_id '${ data.spotify_id }`,
        400
      );
    };

    const result = await db.query (
      `INSERT INTO artists ( spotify_id, name, genre, spotify_uri )
      VALUES ( $1, $2, $3, $4 ) RETURNING spotify_id`, 
      [ data.spotify_id, data.name, data.genre, data.spotify_uri ]
    );

    return result.rows[0];

  }
}