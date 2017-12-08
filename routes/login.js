var express = require('express');
var router = express.Router();
var User = require('../models/UserSchema.js')

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});


router.post('/', function(req, res, next) {

  if (!req.body.userName || !req.body.password) {
    res.send('Both Password and Username required');
  } else {
    var userData = {
      userName: req.body.userName,
      password: req.body.password
    }

    User.authenticate(userData.userName, userData.password, function(err, result) {
      if (err) {
        res.send('err');
        res.redirect('login');
      }

      req.session.userID = result._id;
      req.session.userName = result.userName;
      req.session.userEmail = result.email;
      req.session.loggedIn = true;
      res.redirect('/userPage');
    });
  }

  // if (req.body.userName && req.body.password) {




});




module.exports = router;
