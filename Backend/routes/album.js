const express = require("express");
const router = express.Router();
const { validate } = require("jsonschema");
const addAlbumSchema = require("../schemas/addAlbumSchema.json");
const Albums = require("../models/albums");
const ExpressError = require("../helpers/expressError");

router.post( "/", async function( req, res, next ) {
  try {
    const validation = validate( req.body, addAlbumSchema );

    if ( !validation.valid ) {
      throw new ExpressError(validation.errors.map( e => e.stack ), 400 );
    }

    const albumId = await Albums.add( req.body );
    return res.status( 201 ).json( { albumId } );

  } catch ( err ) {
    next( err );
  }
} );

module.exports = router;

