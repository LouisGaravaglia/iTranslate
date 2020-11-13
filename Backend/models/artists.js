const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
// const sqlForPartialUpdate = require("../helpers/partialUpdate");

class Artists {

  static async add ( data ) {
    
    const duplicateCheck = await db.query (
      `SELECT spotify_id FROM artists WHERE spotify_id = $1`, [ data.spotify_id ]
    );

    if ( duplicateCheck.rows.length ) {
      throw new ExpressError (
        `There already exists an artist with spotify_id '${ data.spotify_id }`,
        400
      );
    };

    const result = await db.query (
      `INSERT INTO artists ( spotify_id, name, genre, spotify_uri, img_url, popularity )
      VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING spotify_id`, 
      [ data.spotify_id, data.name,'{"rock", "blues", "jazz"}', data.spotify_uri,'{"http://www.kjl.com", "http://www.kjl.com"}', data.popularity  ]
    );

    //     static createPostgresArray(data) {
    //       data.img_url.filter(obj => obj.url)
      
    // }


    return result.rows[0];

  }
}

module.exports = Artists;