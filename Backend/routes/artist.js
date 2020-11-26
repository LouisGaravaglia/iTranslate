const express = require("express");
const router = express.Router();
const Artists = require('../models/Artists');
const {validate} = require('jsonschema');
const addArtistSchema = require('../schemas/addArtistSchema.json');
const ExpressError = require("../helpers/expressError");

router.get("/:handle", async function(req, res, next) {
  try {

    if (req.params.handle === "ids") {
      const response = await Artists.getArtistsAndIds();
      return res.status(201).json({response});
    } else if (req.params.handle === "allGenres") {
      const response = await Artists.getGenres();
      return res.status(201).json({response});
    } else if (req.params.handle === "byGenre") {
      const response = await Artists.getArtistByGenre(req.query.genre);
      return res.status(201).json({response});
    };

  } catch (e) {
    return next(e);
  };
});

router.post("/", async function(req, res, next) {
  try {
    const validation = validate(req.body, addArtistSchema);

    if (!validation.valid) {
      throw new ExpressError(validation.errors.map(e => e.stack), 400);
    };

    const response = await Artists.add(req.body);
    return res.status(201).json({response});
  } catch (e) {
    return next(e);
  };
});

module.exports = router;
