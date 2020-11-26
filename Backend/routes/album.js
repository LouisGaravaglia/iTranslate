const express = require("express");
const router = express.Router();
const {validate} = require("jsonschema");
const addAlbumSchema = require("../schemas/addAlbumSchema.json");
const Albums = require("../models/Albums");
const ExpressError = require("../helpers/expressError");

router.get("/", async function(req, res, next) {
  try {
    const response = await Albums.getAlbums(req.query.artistId);
    return res.status( 201 ).json({response});
  } catch (err) {
    next( err );
  };
});

router.post( "/", async function( req, res, next ) {
  try {
    console.log("MADE IT TO THE ALBUM POST ROUTE");
    console.log("HERE IS REQ.BODY", req.body);
    const validation = validate( req.body, addAlbumSchema );

    if ( !validation.valid ) {
      throw new ExpressError(validation.errors.map( e => e.stack ), 400 );
    }

    const response = await Albums.add( req.body );
    console.log("RETURNING FROM THE ALBUM POST ROUTE");
    return res.status( 201 ).json( { response } );

  } catch ( err ) {
    next( err );
  };

});

// router.delete( "/", async function( req, res, next ) {
//   try {
//     console.log("MADE IT TO THE ALBUM DELETE ROUTE");
//     console.log("HERE IS REQ.BODY", req.body);

//     const response = await Albums.delete( req.body.spotify_id );
//     console.log("RETURNING FROM THE ALBUM DELETE ROUTE");
//     return res.status( 201 ).json( { response } );

//   } catch ( err ) {
//     next( err );
//   };
// });

module.exports = router;