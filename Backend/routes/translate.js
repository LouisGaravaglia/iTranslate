const express = require("express");
const router = express.Router({ mergeParams: true });
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const IBM_API_KEY = process.env.IBM_API_KEY;
const IBM_URL  = process.env.IBM_URL;
// const IBM_VERSION = process.env.IBM_VERSION;

const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: IBM_API_KEY,
  }),
  serviceUrl: IBM_URL,
});

const translateParams = {
  text: 'Hello friend',
  modelId: 'en-es',
};






router.get("/", async function(req, res, next) {

  try {
    console.log("API KEY", IBM_API_KEY);
    console.log("API URL", IBM_URL);
    // console.log("IBM VERSION", IBM_VERSION);
    languageTranslator.translate(translateParams)
    .then(translationResult => {
      console.log(JSON.stringify(translationResult, null, 2));
      return JSON.stringify(translationResult, null, 2);
    })
    .catch(err => {
      console.log('error:', err);
    });
  }

  catch (err) {
    return next(err);
  }
});

module.exports = router;
