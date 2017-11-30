// Make sure people are logged in
function requiresLogin(req, res, next) {
  if (req.session && req.session.loggedIn) {
    return next();
  } else {
    var err = new Error('You must be logged in to view');
    err.status = 401;
    return next(err);
  }
}

module.exports = requiresLogin;
