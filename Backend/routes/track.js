const express = require("express");
const router = express.Router();
const { validate } = require("jsonschema");
const addTrackSchema = require("../schemas/addTrackSchema.json");
const Tracks = require("../models/Tracks.js");
const ExpressError = require("../helpers/expressError");


router.post( "/", async function( req, res, next ) {
  try {
    const validation = validate( req.body, addTrackSchema );
     console.log("MADE IT TO THE TRACK POST ROUTE");
      debugger;
    if ( !validation.valid ) {
      throw new ExpressError( validation.errors.map( e => e.stack ), 400 );
    }


    const track_id = await Tracks.add( req.body );
     console.log("RETURNING FROM THE TRACK POST ROUTE");
    return res.status( 201 ).json( { track_id } );

  } catch( err ) {
    return next( err );
  }
} );

module.exports = router;