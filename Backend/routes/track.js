const express = require("express");
const router = express.Router();
const { validate } = require("jsonschema");
const addTrackSchema = require("../schemas/addTrackSchema.json");
const Tracks = require("../models/Tracks.js");
const ExpressError = require("../helpers/expressError");


router.get( "/:handle", async function(req, res, next) {
  try {
    console.log("MADE IT TO THE danceablity/checkmark GET ROUTE", req.query);

    if (req.params.handle === "danceability") {
      const response = await Tracks.getDanceabilityTracks(req.query);
      console.log("RETURING FORM THE TRACKS GET ROUTE", response);
      return res.status( 201 ).json( { response }  )
    }else if (req.params.handle === "checkmark") {
      const response = await Tracks.getCheckmarkValue(req.query.trackId);
      console.log("RETURING FORM THE TRACKS getCheckmarkValue ROUTE", response);
      return res.status( 201 ).json( { response }  )
    }


  }

  catch ( err ) {
    return next( err );
  }
});

router.post( "/", async function( req, res, next ) {
  try {
    const validation = validate( req.body, addTrackSchema );
     console.log("MADE IT TO THE TRACK POST ROUTE");
      debugger;
    if ( !validation.valid ) {
      throw new ExpressError( validation.errors.map( e => e.stack ), 400 );
    }


    const response = await Tracks.add( req.body );
     console.log("RETURNING FROM THE TRACK POST ROUTE");
    return res.status( 201 ).json( { response } );

  } catch( err ) {
    return next( err );
  }
} );

module.exports = router;