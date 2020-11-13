const db = require("../db");
const ExpressError = require("../helpers/ExpressError");

class Translation {

  static async add (data) {

    console.log("ENTERING DISCOGRAPHY ROUTE");
    console.log("DISCOGRAPHY data: ", data);

    const duplicateCheck = await db.query (
      `SELECT track_id FROM discography WHERE track_id = $1`, [data.trackId]
    );

    if (duplicateCheck.rows.length) {
      return "track already exists in DB";
    };

    const result = await db.query (
      `INSERT INTO discography (track_id, artist_id, album_id)
      VALUES ($1, $2, $3) RETURNING track_id`, 
      [data.trackId, data.artistId, data.albumId]
    );

    return result.rows[0];

  }
}

module.exports = Translation;