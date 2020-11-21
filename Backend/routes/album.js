const express = require("express");
const router = express.Router();
const { validate } = require("jsonschema");
const addAlbumSchema = require("../schemas/addAlbumSchema.json");
const Albums = require("../models/Albums");
const ExpressError = require("../helpers/expressError");

router.get( "/", async function( req, res, next ) {
  try {
    console.log("MADE IT TO THE ALBUM GET ROUTE");
    const response = await Albums.checkIfAlbumIsInDB( req.query.albumId );
    console.log("RETURNING FROM THE ALBUM GET ROUTE");
    return res.status( 201 ).json( { response } );
  } catch ( err ) {
    next( err );
  }
});

router.post( "/", async function( req, res, next ) {
  try {
    console.log("MADE IT TO THE ALBUM POST ROUTE");
    const validation = validate( req.body, addAlbumSchema );

    if ( !validation.valid ) {
      throw new ExpressError(validation.errors.map( e => e.stack ), 400 );
    }

    const response = await Albums.add( req.body );
    console.log("RETURNING FROM THE ALBUM POST ROUTE");
    return res.status( 201 ).json( { response } );

  } catch ( err ) {
    next( err );
  }
});

module.exports = router;

