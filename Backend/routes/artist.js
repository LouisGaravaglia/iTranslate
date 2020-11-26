const express = require("express");
const router = express.Router();
const Artists = require('../models/Artists');
const { validate } = require('jsonschema');
const addArtistSchema = require('../schemas/addArtistSchema.json');
const ExpressError = require("../helpers/expressError");


router.get( "/:handle", async function( req, res, next ) {
  try {
    console.log("MADE IT TO THE ARTIST GET ROUTE");

    if (req.params.handle === "ids") {
      const response = await Artists.getArtistsAndIds();
      console.log("RETURING FORM THE ARTIST/:IDS GET ROUTE");
      return res.status( 201 ).json( { response }  )
    } else if (req.params.handle === "allGenres"){
      const response = await Artists.getGenres();
      console.log("RETURING FORM THE ARTIST GET ROUTE");
      return res.status( 201 ).json( { response }  )
    } else if (req.params.handle === "byGenre") {
      console.log("getArtistByGenre req.query: ", req.query.genre);
      const response = await Artists.getArtistByGenre(req.query.genre);
      console.log("RETURING FORM THE ARTIST GET ROUTE");
      return res.status( 201 ).json( { response }  )
    }




  } catch ( err ) {
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

// router.delete( "/", async function( req, res, next ) {
//   try {
//     console.log("MADE IT TO THE ARTIST DELETE ROUTE");
//     console.log("HERE IS REQ.BODY", req.body);

//     const response = await Artists.delete( req.body.spotify_id );
//     console.log("RETURNING FROM THE ARTIST DELETE ROUTE");
//     return res.status( 201 ).json( { response } );

//   } catch ( err ) {
//     next( err );
//   };
// });

module.exports = router;
