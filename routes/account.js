var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../schemas/user');



/* Handle Login POST */
router.post('/signin', passport.authenticate('local'), function(req, res) {
  console.log('loggin in');
  res.json({username : req.user.username});  
});

router.get('/signin', function(req, res) {
  console.log('loggin in');
  if (req.isAuthenticated()) {
    return res.json({username : req.user.username});
  }
  res.status(401);
  res.send('not logged in');
});

/* Handle Registration POST */
router.post('/register', function(req, res) {
  
  console.log(req.body);
  User.register(new User({ username : req.body.username }), req.body.password, (err, account) => {
    if (err) {
      res.status(403);
      return res.end();
    }

    passport.authenticate('local')(req, res, function () {
      res.json({username : req.user.username});
    });
  });
});

router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
