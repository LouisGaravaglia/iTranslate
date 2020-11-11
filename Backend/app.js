require('dotenv').config()
const express = require("express");
const app = express();
const ExpressError = require("./helpers/expressError");
const cors = require('cors');
const translateRoutes = require("./routes/translate");
app.use(cors({origin: true, credentials: true}));
app.options('*', cors()) 
app.use("/translate", translateRoutes);

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
