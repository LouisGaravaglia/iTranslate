const express = require("express");
const router = express.Router({ mergeParams: true });
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const {IBM_API_KEY} = 

const languageTranslator = new LanguageTranslatorV3({
  version: '5.7.1',
  authenticator: new IamAuthenticator({
    apikey: '{apikey}',
  }),
  serviceUrl: '{url}',
});




router.get("/", async function(req, res, next) {
  const lyrics = req.body.translate
  try {

  }

  catch (err) {
    return next(err);
  }
});

module.exports = router;
