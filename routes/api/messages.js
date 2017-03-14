var express = require('express');
var router = express.Router();
var User = require('../../schemas/user');
var helpers = require('./helpers');
var dbHelpers = require('../../schemas/helpers');

//only general room implemented
router.get('/rooms/:roomName', function(req, res) {
  dbHelpers.getMessages('room', req.params.roomName, messages => {
    res.json(messages);
  });
});

router.get('/games/:gameID', function(req, res) {
  dbHelpers.getMessages('game', req.params.gameID, messages => {
    res.json(messages);
  });
});

router.get('/users/:username', helpers.isAuthenticated, function(req, res) {
  dbHelpers.getMessages('private', [req.user.username, req.params.username], messages => {
    res.json(messages);
  });
});


const createGame = (res, user, opponent) => {
  
  const userIsWhite = Math.random() < 0.5 ? true : false;
  
  Game.create({white: userIsWhite ? user : opponent,
               black: userIsWhite ? opponent : user,
               status: opponent ? 'started' : 'waiting'})
  .then(doc => {
    console.log(doc);
    res.json({gameID: doc.gameID});
    dbHelpers.getGames(games => {
      io.updateGameList(games);
    });
  });
};

module.exports = router;


