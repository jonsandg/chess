var express = require('express');
var router = express.Router();
var User = require('../../schemas/user');
var Friend = require('../../schemas/friend');
var FriendRequest = require('../../schemas/friendRequest');
var helpers = require('./helpers');
var io = require('../../socketHandler');

/*
TODO
handle already a friend
remove friend
*/

//add a friend (if there's a request)
router.post('/', helpers.isAuthenticated, function(req, res) {
  console.log(req.user.username, 'adding a friend'); 
  
  const user = req.user.username;
  const friend = req.body.username;
  
  FriendRequest.findOneAndRemove({from: friend,
                                  to: user})
  .then(doc => {
    if(doc) {
      Friend.findOne( {$or: [{user1: user, user2: friend},
                         {user1: friend, user2: user}] })
      .then(val => {
        console.log(val);
        if (!val) { //if not already friends
          Friend.create({user1: user, user2: friend})
          .then(newFriend => {
            console.log('new friends!');
            console.log(newFriend);
            res.status(201);
            res.json({message: `${friend} added to friends`});
            io.notifyNewFriend(user, friend);
          });
        } else {
          res.status(403);
          res.end();
        } 
      });
    } else { //no friend request from that user
      res.status(404);
      res.end();
    }
  });
  
});

//get list of friends
router.get('/', helpers.isAuthenticated, function(req, res) {
  console.log(req.user.username, 'getting some friends');
  const user = req.user.username;
  
  Friend.find({ $or: [{user1: user},
                     {user2: user}] })
  .then(friends => {
    res.json(friends.map(element => {
      if (element.user1 === user)
        return element.user2;
      return element.user1;
    }));
  });
});

//send a friend request
router.post('/requests', helpers.isAuthenticated, function(req, res) {
  
  console.log(req.user.username, 'sending friend req');
  
  const user = req.user.username;
  const friend = req.body.username;
  
  if(user === friend) {
    res.status(403);
    return res.json({ message : 'You can\'t send a friend request to yourself'});
  }
  
  User.findOne({username: friend})
  .then(doc => {
    if (doc) {
      FriendRequest.findOrCreate({from: user, to: friend})
      .then(val => {
        console.log(val);
        res.status(201);
        res.json({
          user: user,
          friend: friend
        });
        if(val.created) io.notifyNewFriendRequest(user, friend);
      })
      .catch(err => {
        console.log('error', err);
      });
    } else {
      res.status(404);
      res.json({ message: 'No user with that name' });
    }
  });
  
});

//get all friend requests
router.get('/requests', helpers.isAuthenticated, function(req, res) {
  
  FriendRequest.find({ to: req.user.username})
  .then(requests => {
    
    res.json(requests.map(request => {
      return request.from;
    }));
  });
  
});

//decline a friend request
router.delete('/requests/:username', helpers.isAuthenticated, function(req, res) {
  
  FriendRequest.findOneAndRemove({ from : req.params.username,
                                   to: req.user.username })
  .then(doc => {
    if(doc) {
      res.status(200);
      res.json({message: `Friend request from ${req.params.username} declined`});
    } else {
      res.status(404);
      res.end();
    }
  });
  
});

module.exports = router;





