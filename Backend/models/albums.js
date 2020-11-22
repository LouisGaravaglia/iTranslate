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
      `INSERT INTO albums ( spotify_id, name, release_date, spotify_uri, img_url, artist_id)
      VALUES ( $1, $2, $3, $4, $5, $6) RETURNING spotify_id`, 
      [ data.spotify_id, data.name, data.release_date, data.spotify_uri, data.img_url, data.artist_id ]
    );

    return result.rows[0].spotify_id;

  }

  // `SELECT d.spotify_id AS "albumId", d.img_url AS "albumImg", d.name AS "albumName"
  //     FROM albums d 
  //     JOIN tracks t ON d.album_id = t.album_id 
  //     WHERE d.artist_id = $1 AND t.lyrics != 'No Lyrics'`

  static async getAlbums(artistId) {
    console.log("INSIDE ALBUMS.getAlbums METHOD", artistId);

    const result = await db.query (
      `SELECT d.spotify_id AS "albumId", d.img_url AS "albumImg", d.name AS "albumName"
       FROM albums d 
       JOIN tracks t ON d.spotify_id = t.album_id 
       WHERE d.artist_id = $1 AND t.lyrics != 'No Lyrics'`, [artistId]);
    console.log("Here is the result of rows from getAlbums", result.rows);

    return result.rows;
  }

  //   static async getAlbums(artistId) {
  //   console.log("INSIDE ALBUMS.getAlbums METHOD", artistId);

  //   const result = await db.query (
  //     `SELECT spotify_id, img_url, name FROM albums WHERE artist_id = $1`, [artistId]);
  //   console.log("Here is the result of rows[0]", result.rows[0]);

  //   return result.rows;
  // }

  //   static async checkIfAlbumIsInDB(albumId) {
  //   console.log("INSIDE ALBUMS.checkIfAlbumIsInDB METHOD", albumId);

  //   const result = await db.query (
  //     `SELECT name FROM albums WHERE spotify_id = $1`, [albumId]);
  //   console.log("Here is the result of rows[0]", result.rows[0]);

  //   if (result.rows.length ) {
  //     return true;
  //   } else {
  //     return false;
  //   } 
  // }
}

module.exports = Albums;