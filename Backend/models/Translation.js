const db = require("../db");
const ExpressError = require("../helpers/ExpressError");

class Translation {

  static async add(data) {

    console.log("ENTERING LYRICS ADD ROUTE");
    console.log("LYRICS add data: ", data);

    const duplicateCheck = await db.query (
      `SELECT track_id, language FROM translation WHERE ( track_id, language )
      = ($1, $2)`, [data.track_id, data.language]
    );

    if (duplicateCheck.rows.length) {
      return "translation already exists in DB";
    };

    const result = await db.query (
      `INSERT INTO translation (track_id, translation, language)
      VALUES ($1, $2, $3) RETURNING track_id`, 
      [data.track_id, data.translation, data.language]
    );

    return result.rows[0];

  }

  static async get(data) {

    console.log("ENTERING TRANSLATION GET ROUTE");
    console.log("TRANSLATION get data: ", data);

    const result = await db.query (
      `SELECT translation FROM translation WHERE track_id = $1`, [data.track_id]
    );
    console.log("GET TRANSLATION result: ", result);

    if (result.rows.length) {
      return result.rows[0].translation;
    } else {
      return "No Translation in DB";
    }

  }
}

module.exports = Translation;