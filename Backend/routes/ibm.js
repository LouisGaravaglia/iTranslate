const express = require("express");
const router = express.Router();
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const IBM_API_KEY = process.env.IBM_API_KEY;
const IBM_URL  = process.env.IBM_URL;
const IBM_VERSION = process.env.IBM_VERSION;

const languageTranslator = new LanguageTranslatorV3({
  version: IBM_VERSION,
  authenticator: new IamAuthenticator({
    apikey: IBM_API_KEY,
  }),
  serviceUrl: IBM_URL,
});

router.get("/:handle", async function(req, res, next) {
  try {

    if (req.params.handle === "translate") {
      const lyrics = req.query.lyrics;
      const translateParams = {
        text: lyrics,
        target: 'es',
      };

      const response =  await languageTranslator.translate(translateParams);
      return res.json(JSON.stringify({response: response.result.translations[0].translation}));

    } else {
      const response =  await languageTranslator.listLanguages();
      return res.json(JSON.stringify({response}))
    }
  }
  catch (err) {
    console.log(err);
    return next(err);
  }

});



module.exports = router;