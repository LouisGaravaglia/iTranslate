const express = require("express");
const router = express.Router();
const { validate } = require("jsonschema");
const addTrackSchema = require("../schemas/addTrackSchema.json");
const Tracks = require("../models/tracks.js");
const ExpressError = require("../helpers/expressError");


router.post( "/", async function( req, rex, next ) {
  try {
    const validation = validate( req.body, addTrackSchema );

    if ( !validation.valid ) {
      throw new ExpressError( validation.errors.map( e => e.stack ), 400 );
    }

    const trackId = await Tracks.add( req.body );
    return res.status( 201 ).json( { trackId } );

  } catch( err ) {
    return next( err );
  }
} );

module.exports = router;