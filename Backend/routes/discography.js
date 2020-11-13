const express = require("express");
const router = express.Router();
const Discography = require("../models/Discography");

router.post( "/", async function( req, res, next ) {
  try {

    const addedDiscography = await Discography.add( req.body );
     console.log("RETURNING FROM THE DISCOGRAPHY POST ROUTE");
    return res.status( 201 ).json( { addedDiscography } );

  } catch ( err ) {
    next( err );
  }
} );

module.exports = router;

