var express = require('express');
var router = express.Router();
var User = require('../../schemas/user');
var Friend = require('../../schemas/friend');
var Game = require('../../schemas/game');

//get list of friends
router.get('/:username', function(req, res) {

  const username = req.params.username;
  const requester = req.user ? req.user.username : null;
  
  let response = {};
  
  User.findOne({username: username})
  .then(user => {
    if(user) {
      response.username = user.username;
      Friend.findOne( {$or: [{user1: username, user2: requester},
                             {user1: requester, user2: username}] })
      .then(friendship => {
        if(friendship) {
          response.areFriends = true;
        } else {
          response.areFriends = false;
        }
        
        Game.find({ $or: [{white: username},
                          {black: username}] }).lean()
        .then(games => {
          games = games.map(game => {
            const isWhite = username === game.white;
            let title;
            if(game.status === 'waiting')
              title = 'Waiting for ' + (isWhite ? 'black' : 'white') + ' player';
            else
              title = 'Versus: ' + (isWhite ? game.black : game.white);
            return {
              gameID: game.gameID,
              status: game.status,
              title: title
            };
          });
          response.games = games;
          res.json(response);
        });
        
      });
    } else {
      res.status(404);
      res.end();
    }
  });
  
  
});



module.exports = router;





