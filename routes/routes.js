const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/say-something', controllers.saySomething);
router.get('/time/:mode', controllers.getTime);
router.get('/feed/:page', controllers.getFeed);

module.exports = router;