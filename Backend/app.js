require('dotenv').config()
const express = require("express");
const app = express();
const ExpressError = require("./helpers/expressError");
const cors = require('cors');
const ibmRoutes = require("./routes/ibm");
const artistRoutes = require("./routes/artist");
const albumRoutes = require("./routes/album");
const trackRoutes = require("./routes/track");

app.use(cors({origin: true, credentials: true}));
app.options('*', cors()) 

app.use("/ibm", ibmRoutes);
app.use("/track", trackRoutes);
app.use("/artist", artistRoutes);
app.use("/album", albumRoutes);


/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);
  return res.json({
    status: err.status,
    message: err.message
  });
});


module.exports = app;
