const db = require("../db");
const ExpressError = require("../helpers/ExpressError");

class Tracks {

  static async getDanceabilityTracks(data) {
    console.log("INSIDE TRACKS.getDanceablityTracks METHOD", data);
    const result = await db.query (
      `SELECT t.name AS "trackName", t.spotify_id AS "trackId",
       a.name AS "artistName", a.spotify_id AS "artistId",
      d.name AS "albumName", d.spotify_id AS "albumId"
      FROM tracks t 
      JOIN artists a ON t.artist_id = a.spotify_id 
      JOIN albums d ON t.album_id = d.spotify_id
      WHERE t.danceability >= $1 AND t.danceability < $2 AND t.lyrics != 'No Lyrics'`, [data.lowerLimit, data.upperLimit]);
    console.log("HERE IS THE RESULT", result);

    return result.rows;

  }

//           trackId: track.id, 
//           trackName: track.name, 
//           artistId: track.artists[0].id,
//           artistName: track.artists[0].name,
//           albumId,
//           hasLyrics,
//           inDatabase

  static async getTracks(albumId) {
    console.log("INSIDE TRACKS.getTracks METHOD", albumId);
    const result = await db.query (
      `SELECT t.name AS "trackName", t.spotify_id AS "trackId",
      t.artist_id AS "artistId", a.name AS "artistName", t.album_id AS "albumId"
      FROM tracks t
      JOIN artists a ON t.artist_id = a.spotify_id 
      WHERE t.album_id = $1 AND lyrics != 'No Lyrics'`, [albumId]);
    console.log("HERE IS THE RESULT FROM getTracks: ", result);

    return result.rows;

  }

  // static async checkIfTrackHasLyrics(trackId) {
  //   console.log("INSIDE TRACKS.checkIfTrackHasLyrics METHOD", trackId);

  //   const result = await db.query (
  //     `SELECT lyrics FROM tracks WHERE spotify_id = $1`, [trackId]);
  //   console.log("Here is the result of rows[0]", result.rows[0]);

  //   if (result.rows[0] === "No Lyrics") {
  //     return false;
  //   } else if (result.rows[0] === undefined){
  //     return false;
  //   } else {
  //     return true
  //   }
  // }

  // static async checkIfTrackIsInDB(trackId) {
  //   console.log("INSIDE TRACKS.checkIfTrackIsInDB METHOD", trackId);

  //   const result = await db.query (
  //     `SELECT name FROM tracks WHERE spotify_id = $1`, [trackId]);
  //   console.log("Here is the result of rows[0]", result.rows[0]);

  //   if (result.rows.length ) {
  //     return true;
  //   } else {
  //     return false;
  //   } 
  // }

  static async addTrackData ( data ) {
    console.log("INSIDE TRACKS.ADD METHOD", data);
    const duplicateCheck = await db.query (
      `SELECT spotify_id FROM tracks WHERE spotify_id = $1`, [ data.spotify_id ]
    );
    console.log("DUPLICATE CHECK: ", duplicateCheck);
    if ( duplicateCheck.rows.length ) {
      return "This song already exists in DB";
    };
      console.log("MY TRACK DATA: ", data);

    const result = await db.query (
      `INSERT INTO tracks ( spotify_id, name, explicit, popularity, preview_url, spotify_uri, danceability, tempo, valence, duration, artist_id, album_id)
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING spotify_id`, 
      [ data.spotify_id, data.name, data.explicit, data.popularity, data.preview_url, data.spotify_uri, data.danceability, data.tempo, data.valence, data.duration, data.artist_id, data.album_id]
    );
    console.log("HERE IS THE RESULT", result);

    return result.rows[0].spotify_id;

  }

  static async addLyrics(data) {
    console.log("ENTERING LYRICS ADD ROUTE");
    console.log("LYRICS add data: ", data);

    const result = await db.query (
      `UPDATE tracks SET lyrics = $1 WHERE spotify_id = $2`, 
      [data.lyrics, data.track_id]
    );

    return result.rows[0];
  }

  static async getLyrics(track_id) {
    console.log("ENTERING LYRICS GET ROUTE");
    console.log("LYRICS get data: ", track_id);

    const result = await db.query (
      `SELECT lyrics FROM tracks WHERE spotify_id = $1`, [track_id]
    );

    if (result.rows.length) {
      return result.rows[0].lyrics;
    } else {
      return "No Lyrics";
    }
  }


}

module.exports = Tracks;