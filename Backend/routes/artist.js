const express = require("express");
const router = express.Router();
const Artists = require('../models/Artists');
const { validate } = require('jsonschema');
const addArtistSchema = require('../schemas/addArtistSchema.json');
const ExpressError = require("../helpers/expressError");


router.get( "/", async function( req, res, next ) {
  try {

  }

  catch ( err ) {
    return next( err );
  }
});

router.post( "/", async function( req, res, next ) {
  try {
    console.log("MADE IT TO THE ARTIST POST ROUTE");
    const validation = validate( req.body, addArtistSchema );

    if ( !validation.valid ) {
      throw new ExpressError( validation.errors.map( e => e.stack ), 400 );
    }

    const response = await Artists.add(req.body);
    console.log("RETURING FORM THE ARTIST POST ROUTE");
    return res.status( 201 ).json( { response }  )

  } catch ( err ) {
    return next( err );
  }
});

module.exports = router;
