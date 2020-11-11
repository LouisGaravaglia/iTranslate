const express = require("express");
const router = express.Router({ mergeParams: true });


router.get("/", async function(req, res, next) {
  try {

  }

  catch (err) {
    return next(err);
  }
});

router.post("/", async function(req, res, next) {
  try {

  }

  catch (err) {
    return next(err);
  }
});

module.exports = router;
