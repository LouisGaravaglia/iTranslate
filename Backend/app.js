require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
// app.use(express.json());
const translateRoutes = require("./routes/translate");

app.use("/translate", translateRoutes);

app.use(cors({origin: true, credentials: true}));
app.options('*', cors()) 

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
//     if (req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
//         res.setHeader('Access-Control-Allow-Credentials', true);
//         return res.status(200).json({});
//     }
//     next();
// });

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  if (err.stack) console.log(err.stack);

  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
