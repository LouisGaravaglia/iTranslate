const db = require("../db");
const ExpressError = require("../helpers/ExpressError");

class Lyrics {

  static async add(data) {

    console.log("ENTERING LYRICS ADD ROUTE");
    console.log("LYRICS add data: ", data);

    const duplicateCheck = await db.query (
      `SELECT track_id FROM lyrics WHERE track_id = $1`, [data.trackId]
    );

    if (duplicateCheck.rows.length) {
      return "lyrics already exists in DB";
    };

    const result = await db.query (
      `INSERT INTO lyrics (track_id, lyrics)
      VALUES ($1, $2) RETURNING track_id`, 
      [data.track_id, data.lyrics]
    );

    return result.rows[0];

  }

  static async get(track_id) {

    console.log("ENTERING LYRICS GET ROUTE");
    console.log("LYRICS get data: ", track_id);

    const result = await db.query (
      `SELECT lyrics FROM lyrics WHERE track_id = $1`, [track_id]
    );

    return result.rows[0].lyrics;

  }



}

module.exports = Lyrics;