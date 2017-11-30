var express = require('express');
var router = express.Router();
var User = require('../models/UserSchema.js')

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});


router.post('/', function(req, res, next) {
  console.log(req.body);

  if (req.body.firstName && req.body.userName && req.body.email && req.body.submit) {

    if (!req.body.passwordConf) {
      req.body.passwordConf = req.body.password;
    }

    var userData = {
      firstName: req.body.firstName,
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    }

    // If password & password confirmatino match
    if (userData.password === userData.passwordConf) {

      // Create User
      User.create(userData, function(err, user) {
        if (err) {
          return next(err)
        } else {

          // Pair session ID with mongoDB ID record
          req.session.userID = user._id;
          req.session.loggedIn = true;
          res.redirect('/login');
        }
      });
    }


  }
});

module.exports = router;
