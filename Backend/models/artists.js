const db = require("../db");
const ExpressError = require("../helpers/ExpressError");

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
    const result = await db.query (`SELECT a.name AS "artistName", a.spotify_id AS "artistId"
      FROM artists a 
      JOIN tracks t ON a.spotify_id = t.artist_id
      WHERE t.lyrics != 'No Lyrics' GROUP BY a.spotify_id, a.name ORDER BY a.name`);
    console.log("HERE IS THE getArtistsAndIds RESULT FROM BACKEND: ", result);
    return result.rows;
  }

  static async delete(artistId) {
    console.log("INSIDE artists.delete METHOD", artistId);

    const result = await db.query (
      `DELETE FROM artists WHERE spotify_id = $1 RETURNING spotify_id`, [artistId]);
    console.log("Here is the result of rows from delete", result.rows);

    return result.rows;;
  };


    static async getGenres() {
    const result = await db.query (`SELECT array_to_string(ARRAY(
      SELECT a.genre 
      FROM artists a
      JOIN tracks t
      ON a.spotify_id = t.artist_id
      WHERE t.lyrics != 'No Lyrics'
      GROUP BY a.genre, a.name
      ), ', ') AS genres`);
    console.log("HERE IS THE new getGenres RESULT FROM BACKEND: ", result);
    return result.rows;
  }


    static async getArtistByGenre(genre) {
      console.log("tHIs is the val of genre i'm passing: ", genre);
    const result = await db.query (`SELECT a.name AS "artistName", a.spotify_id AS "artistId"
    FROM artists a
    JOIN tracks t
    ON a.spotify_id = t.artist_id
    WHERE a.genre ILIKE '%'||$1||'%' AND t.lyrics != 'No Lyrics'
    GROUP BY a.name, a.spotify_id`, [genre]);
    console.log("HERE IS THE getArtistByGenre RESULT FROM BACKEND: ", result);
    return result.rows;
  }
}

module.exports = Artists;