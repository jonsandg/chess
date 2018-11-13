let helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
      return next();
  res.status(401);
  res.send('Not authorized');
};



module.exports = helpers;