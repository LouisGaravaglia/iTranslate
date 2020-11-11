const express = require("express");
const router = express.Router();
const Artists = require('../models/artists');
const { validate } = require('jsonschema');
const { addArtistSchema } = require('../schemas');
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
    const validation = validate( req.body, addArtistSchema );

    if ( !validation.valid ) {
      throw new ExpressError( validation.errors.map( e => e.stack ), 400 );
    }

    const artistId = await Artists.add(req.body);
    return res.status( 201 ).json( { artistId }  )

  } catch ( err ) {
    return next( err );
  }
});

module.exports = router;
