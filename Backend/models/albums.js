const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
// const sqlForPartialUpdate = require("../helpers/partialUpdate");

class Albums {

  static async add ( data ) {

    const duplicateCheck = await db.query (
      `SELECT spotify_id FROM albums WHERE spotify_id = $1`, [ data.spotify_id ]
    );

    if ( duplicateCheck.rows.length ) {
      return data.spotify_id;
    };

    const result = await db.query (
      `INSERT INTO albums ( spotify_id, name, release_date, spotify_uri, img_url )
      VALUES ( $1, $2, $3, $4, $5 ) RETURNING spotify_id`, 
      [ data.spotify_id, data.name, data.release_date, data.spotify_uri, data.img_url ]
    );

    return result.rows[0].spotify_id;

  }
}

module.exports = Albums;