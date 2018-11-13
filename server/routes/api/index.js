var express = require('express');
var router = express.Router();
var friends = require('./friends');
var users = require('./users');
var games = require('./games');
var messages = require('./messages');

//let gameRouter = require('./games.js');

router.get('/', function(req, res, next) {
  res.status(404);
  res.end();
});

router.use('/friends', friends);
router.use('/users', users);
router.use('/games', games);
router.use('/messages', messages);


module.exports = router;
