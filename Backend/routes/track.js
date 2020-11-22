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

    } else if (req.params.handle === "getTracks") {
      const response = await Tracks.getTracks(req.query.albumId);
      console.log("RETURING FORM THE TRACKS getTracks ROUTE", response);
      return res.status( 201 ).json( { response }  )

    } else if (req.params.handle === "getLyrics") {
      const response = await Tracks.getLyrics(req.query.trackId);
      console.log("RETURING FORM THE TRACKS getLyrics ROUTE", response);
      return res.status( 201 ).json( { response }  )

    } 

  } catch ( err ) {
    return next( err );
  }
});


  //  } else if (req.params.handle === "hasLyrics") {
  //     const response = await Tracks.checkIfTrackHasLyrics(req.query.trackId);
  //     console.log("RETURING FORM THE TRACKS checkIfTrackHasLyrics ROUTE", response);
  //     return res.status( 201 ).json( { response }  )

  //   } else if (req.params.handle === "inDatabase") {
  //     const response = await Tracks.checkIfTrackIsInDB(req.query.trackId);
  //     console.log("RETURING FORM THE TRACKS checkIfTrackIsInDB ROUTE", response);
  //     return res.status( 201 ).json( { response }  )
  //   }

router.post( "/", async function( req, res, next ) {
  
  try {
    const validation = validate( req.body, addTrackSchema );
    console.log("MADE IT TO THE TRACK POST ROUTE");

    if ( !validation.valid ) {
      throw new ExpressError( validation.errors.map( e => e.stack ), 400 );
    }

    const response = await Tracks.addTrackData( req.body );
    console.log("RETURNING FROM THE TRACK addTrackData POST ROUTE");
    return res.status( 201 ).json( { response } );
  } catch( err ) {
    return next( err );
  }
} );

router.patch( "/", async function( req, res, next ) {
  
  try {
    console.log("MADE IT TO THE tracks addLyrics PATCH ROUTE");
    const response = await Tracks.addLyrics(req.body);
    console.log("RETURING FORM THE TRACKS addlyrics PATCH ROUTE", response);
    return res.status( 201 ).json( { response }  )
  } catch( err ) {
    return next( err );
  }
} );

module.exports = router;