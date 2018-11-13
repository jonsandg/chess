var express = require('express');
var router = express.Router();
var User = require('../../schemas/user');
var helpers = require('./helpers');
var dbHelpers = require('../../schemas/helpers');
var io = require('../../socketHandler');
var Game = require('../../schemas/game');

//get list of active games?
router.get('/', function(req, res) {
  console.log(dbHelpers);
  dbHelpers.getGames(games => {
    res.json(games);
  });
});

//create new game
router.post('/', helpers.isAuthenticated, function(req, res) {
  const user = req.user.username;
  const opponent = req.body.username ? req.body.username : null;
  
  if(user === opponent) {
    res.status(403);
    res.end();
    return;
  }
  
  if(opponent) {
    User.findOne({username: opponent})
    .then(response => {
      if(response)
        createGame(res, user, opponent);
      else {
        res.status(404);
        res.end();
      }
    });
  } else {
    createGame(res, user, opponent);
  }
  
});

router.get('/:gameID', function(req, res) {
  
  Game.findOne({gameID: req.params.gameID}).lean()
  .then(game => {
    if(game) {
      console.log(game);
      delete game._id;
      delete game.__v;
      res.json(game);
    } else {
      res.status(404);
      res.end();
    }
  })
  .catch(err => {
    res.status(404);
    res.end();
  });
});

router.post('/:gameID/join', helpers.isAuthenticated, function(req, res) {
  
  const user = req.user.username;
  console.log(user, 'trying to join');
  
  Game.findOne({gameID: req.params.gameID}).lean()
  .then(game => {
    if(game) {
      if((game.white && game.black) || game.white === user || game.black === user) {
        res.status(403);
        res.end();
      } else {
        if (game.white) {
          game.black = user;
        } else {
          game.white = user;
        }
        
        Game.findOneAndUpdate({gameID: game.gameID},
                              {$set : {
                                 white: game.white,
                                 black: game.black,
                                 status: 'started'
                               }},
                              {new: true},
                              (err, game) => {
          if (err)
            return console.log(err);
          res.send(200);
          io.notifyGameUpdate(game.gameID, game);
          dbHelpers.getGames(games => {
            io.updateGameList(games);
          });
        });
      }
    } else {
      res.status(404);
      res.end();
    }
  })
  .catch(err => {
    res.status(404);
    res.end();
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





