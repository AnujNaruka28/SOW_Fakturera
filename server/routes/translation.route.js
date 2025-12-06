const express = require('express');
const { getTranslation } = require('../controllers/Translation');
const translationRouter = express.Router();

translationRouter.get('/',getTranslation);

module.exports = translationRouter;