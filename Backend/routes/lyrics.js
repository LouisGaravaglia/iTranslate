const express = require("express");
const router = express.Router();
const Lyrics = require('../models/Lyrics');
const ExpressError = require("../helpers/expressError");


router.get( "/", async function( req, res, next ) {
  try {
    console.log("MADE IT TO THE LYRICS GET ROUTE");


    const response = await Lyrics.get(req.query.track_id);
    console.log("RETURING FORM THE LYRICS GET ROUTE", response);
    return res.status( 201 ).json( { response }  )
  }

  catch ( err ) {
    return next( err );
  }
});

router.post( "/", async function( req, res, next ) {
  try {
    console.log("MADE IT TO THE LYRICS POST ROUTE");
 

    const response = await Lyrics.add(req.body);
    console.log("RETURING FORM THE LYRICS POST ROUTE", response);
    return res.status( 201 ).json( { response }  )

  } catch ( err ) {
    return next( err );
  }
});

module.exports = router;
