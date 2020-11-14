const express = require("express");
const router = express.Router();
const Translation = require('../models/Translation');
const ExpressError = require("../helpers/expressError");


router.get( "/", async function( req, res, next ) {
  try {
    console.log("MADE IT TO THE TRANSLATION GET ROUTE");


    const response = await Translation.get(req.query);
    console.log("RETURING FORM THE TRANSLATION GET ROUTE", response);
    return res.status( 201 ).json( { response }  )
  }

  catch ( err ) {
    return next( err );
  }
});

router.post( "/", async function( req, res, next ) {
  try {
    console.log("MADE IT TO THE TRANSLATION POST ROUTE");

    const response = await Translation.add(req.body);
    console.log("RETURING FORM THE TRANSLATION POST ROUTE");
    return res.status( 201 ).json( { response }  )

  } catch ( err ) {
    return next( err );
  }
});

module.exports = router;
